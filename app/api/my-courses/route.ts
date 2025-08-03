// app/api/my-courses/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await (await supabase).auth.getUser();

  if (error || !user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const studentId = profile.id;

  const purchases = await prisma.purchase.findMany({
    where: {
      studentId,
      course: { isPublished: true },
    },
    select: {
      courseId: true,
      course: {
        select: {
          title: true,
          category: { select: { name: true } },
        },
      },
    },
  });

  const courseData = await Promise.all(
    purchases.map(async (purchase) => {
      const courseId = purchase.courseId;
      const title = purchase.course?.title || "Untitled";
      const category = purchase.course?.category?.name || "Other";

      const [completedLessons, totalLessons] = await Promise.all([
        prisma.progress.count({
          where: {
            studentId,
            lessons: { modules: { courseId } },
            isCompleted: true,
          },
        }),
        prisma.lessons.count({
          where: { modules: { courseId } },
        }),
      ]);

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
        mentor: "Mentor's Name",
        currentLesson: completedLessons,
        totalLessons,
        progress,
        image: "/images/course_placeholder_2.jpg?height=120&width=200",
        status: isCompleted ? "finished" : "active",
      };
    })
  );

  return NextResponse.json(courseData);
}
