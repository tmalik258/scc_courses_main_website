import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user?.id) {
      console.error("Authentication error:", authError?.message);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    let profile = await prisma.profile.findUnique({
      where: { userId },
      select: { id: true, email: true, fullName: true },
    });

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          userId,
          email: null,
          fullName: null,
          avatarUrl: null,
          role: "STUDENT",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        select: { id: true, email: true, fullName: true },
      });
    }

    const studentId = profile.id;

    const [purchases, certificates] = await prisma.$transaction([
      prisma.purchase.findMany({
        where: { studentId },
        select: {
          course: {
            select: {
              id: true,
              title: true,
              category: { select: { name: true } },
              instructor: { select: { fullName: true } },
            },
          },
        },
      }),
      prisma.certificate.findMany({
        where: { studentId },
        select: { courseId: true },
      }),
    ]);

    const courseProgress = await Promise.all(
      purchases.map(async (purchase) => {
        const course = purchase.course;
        const courseId = course.id;
        const completedLessons = await prisma.progress.count({
          where: {
            studentId,
            isCompleted: true,
            lessons: { modules: { courseId } },
          },
        });

        const totalLessons = await prisma.lessons.count({
          where: { modules: { courseId } },
        });

        const total = totalLessons || 1;
        const progress = Math.round((completedLessons / total) * 100);

        const category = course.category?.name ?? "Other";
        const title = course.title;
        const mentorName = course.instructor?.fullName ?? "Unknown";

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
          Other: { bgColor: "bg-gray-500/50", textColor: "text-gray-500" },
        };

        const styles = categoryStyles[category] || categoryStyles.Other;

        return {
          category,
          categoryBgColor: styles.bgColor,
          categoryTextColor: styles.textColor,
          title,
          mentorName,
          currentLesson: completedLessons,
          totalLessons: total,
          progress,
        };
      })
    );

    const completedCourseIds = new Set(certificates.map((c) => c.courseId));
    const completedCount = completedCourseIds.size;
    const ongoingCount = purchases.filter(
      (p) => !completedCourseIds.has(p.course.id)
    ).length;

    const dashboardData = {
      ongoingCount,
      completedCount,
      certificateCount: certificates.length,
      courses: courseProgress,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("[GET /api/dashboard] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
