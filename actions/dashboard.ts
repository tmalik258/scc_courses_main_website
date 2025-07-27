// actions/dashboard.ts
"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/scc_courses_main_website/lib/supabase";
import { redirect } from "next/navigation";

interface Course {
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  currentLesson: number;
  totalLessons: number;
  progress: number;
}

export async function getDashboardData() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user?.id) {
    console.error("Authentication failed:", authError?.message || "No user ID");
    redirect("/login");
  }

  const userId = user.id;

  // Fetch or create user profile
  let profile = await prisma.profiles.findUnique({
    where: { user_id: userId },
    select: { id: true, email: true, full_name: true },
  });

  if (!profile) {
    profile = await prisma.profiles.create({
      data: {
        user_id: userId,
        email: user.email ?? null,
        full_name:
          user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
        avatar_url:
          user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null,
        role: "STUDENT",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      select: { id: true, email: true, full_name: true },
    });
  }

  const studentId = profile.id;

  // Get purchases and certificates in one transaction
  const [purchases, certificates] = await prisma.$transaction([
    prisma.purchases.findMany({
      where: {
        student_id: studentId,
        courses: { is_published: true },
      },
      select: {
        course_id: true,
        courses: {
          select: {
            title: true,
            categories: {
              select: { name: true },
            },
          },
        },
      },
    }),
    prisma.certificates.findMany({
      where: { student_id: studentId },
      select: { course_id: true },
    }),
  ]);

  // Build course progress list
  const courseProgress: Course[] = await Promise.all(
    purchases.map(async (purchase) => {
      const { course_id, courses } = purchase;
      const category = courses?.categories?.name ?? "Other";
      const title = courses?.title ?? "Untitled Course";

      const [completedLessons, totalLessons] = await Promise.all([
        prisma.progress.count({
          where: {
            student_id: studentId,
            lessons: { course_id },
            is_completed: true,
          },
        }),
        prisma.lessons.count({
          where: { course_id },
        }),
      ]);

      const categoryStyles: Record<
        string,
        { bgColor: string; textColor: string }
      > = {
        "Data Science": {
          bgColor: "bg-blue-600/25",
          textColor: "text-blue-600",
        },
        "WhatsApp Chatbots": {
          bgColor: "bg-purple-500/50",
          textColor: "text-purple-500",
        },
        "AI Calling": {
          bgColor: "bg-green-500/50",
          textColor: "text-green-500",
        },
        Other: {
          bgColor: "bg-gray-500/50",
          textColor: "text-gray-500",
        },
      };

      const styles = categoryStyles[category] || categoryStyles["Other"];
      const total = totalLessons || 1;
      const progress = Math.round((completedLessons / total) * 100);

      return {
        category,
        categoryBgColor: styles.bgColor,
        categoryTextColor: styles.textColor,
        title,
        currentLesson: completedLessons,
        totalLessons: total,
        progress,
      };
    })
  );

  const completedCourseIds = new Set(certificates.map((c) => c.course_id));
  const completedCount = completedCourseIds.size;
  const ongoingCount = purchases.filter(
    (p) => !completedCourseIds.has(p.course_id)
  ).length;

  return {
    ongoingCount,
    completedCount,
    certificateCount: certificates.length,
    courses: courseProgress,
  };
}
