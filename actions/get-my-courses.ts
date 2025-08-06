"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { MyCourseCardProps } from "@/types/course";
import { categoryStyles } from "@/utils/categoryStyles";
import { getCourseProgress } from "@/utils/courseProgress";

export async function getMyCourses(): Promise<MyCourseCardProps[]> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await (await supabase).auth.getUser();

  if (authError || !user?.id) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!profile) {
    redirect("/login");
  }

  const purchases = await prisma.purchase.findMany({
    where: {
      studentId: profile.id,
      course: { isPublished: true },
    },
    select: {
      courseId: true,
      course: {
        select: {
          id: true,
          title: true,
          category: { select: { name: true } },
        },
      },
    },
  });

  if (!purchases.length) {
    return [];
  }

  const courseData: MyCourseCardProps[] = await Promise.all(
    purchases.map(async ({ courseId, course }) => {
      const { completedLessons, totalLessons, progress, isCompleted } =
        await getCourseProgress(courseId, profile.id);

      const category = course?.category?.name || "Other";
      const styles = categoryStyles[category] || categoryStyles.Other;

      return {
        id: String(courseId),
        category,
        categoryBgColor: styles.bgColor,
        categoryTextColor: styles.textColor,
        title: course?.title || "Untitled",
        mentor: "Mentor's Name",
        currentLesson: completedLessons,
        totalLessons,
        progress,
        image: "/images/course_placeholder_2.jpg",
        status: isCompleted ? "finished" : "active",
      };
    })
  );

  return courseData;
}
