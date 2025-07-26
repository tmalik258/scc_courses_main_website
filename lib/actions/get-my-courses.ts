"use server";

import prisma from "@/lib/prisma";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function getMyCourses() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await (await supabase).auth.getUser();

  if (error || !user?.id) {
    redirect("/login");
  }

  const profile = await prisma.profiles.findUnique({
    where: { user_id: user.id },
    select: { id: true },
  });

  if (!profile) redirect("/login");

  const studentId = profile.id;

  const purchases = await prisma.purchases.findMany({
    where: {
      student_id: studentId,
      courses: { is_published: true },
    },
    select: {
      course_id: true,
      courses: {
        select: {
          title: true,
          categories: { select: { name: true } },
        },
      },
    },
  });

  const courseData = await Promise.all(
    purchases.map(async (purchase) => {
      const courseId = purchase.course_id;
      const title = purchase.courses?.title || "Untitled";
      const category = purchase.courses?.categories?.name || "Other";

      const completedLessons = await prisma.progress.count({
        where: {
          student_id: studentId,
          lessons: { course_id: courseId },
          is_completed: true,
        },
      });

      const totalLessons = await prisma.lessons.count({
        where: {
          course_id: courseId,
        },
      });

      const progress = totalLessons
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

      const isCompleted = completedLessons === totalLessons;

      const categoryStyles: Record<
        string,
        { bgColor: string; textColor: string }
      > = {
        "Data Science": {
          bgColor: "bg-blue-600/25",
          textColor: "text-blue-600",
        },
        "WhatsApp Chatbots": {
          bgColor: "bg-purple-500/25",
          textColor: "text-purple-500",
        },
        "AI Calling": {
          bgColor: "bg-green-500/25",
          textColor: "text-green-500",
        },
        Other: {
          bgColor: "bg-gray-500/25",
          textColor: "text-gray-500",
        },
      };

      const styles = categoryStyles[category] || categoryStyles.Other;

      return {
        id: courseId,
        category,
        categoryBgColor: styles.bgColor,
        categoryTextColor: styles.textColor,
        title,
        mentor: "Mentor's Name", // You can replace with real data
        currentLesson: completedLessons,
        totalLessons,
        progress,
        image: "/images/course_placeholder_2.jpg?height=120&width=200",
        status: isCompleted ? "finished" : "active",
      };
    })
  );

  return courseData;
}
