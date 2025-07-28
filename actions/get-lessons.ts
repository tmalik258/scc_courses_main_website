"use server";

import prisma from "../lib/prisma";
import { LessonData, SectionData } from "@/types/lesson";

export async function getLessonById(
  lessonId: string,
  courseId: string,
  userId?: string
): Promise<LessonData | null> {
  try {
    const lesson = await prisma.lessons.findUnique({
      where: { id: lessonId },
      include: {
        modules: { select: { courseId: true } },
        progress: userId
          ? { where: { studentId: userId }, select: { isCompleted: true } }
          : false,
      },
    });

    if (!lesson || lesson.modules.courseId !== courseId) {
      return null;
    }

    const isPaid = userId
      ? Boolean(
          await prisma.purchase.findFirst({
            where: { courseId, studentId: userId },
          })
        )
      : false;

    const completed =
      userId && lesson.progress?.length
        ? lesson.progress.some((p) => p.isCompleted)
        : false;

    return {
      id: lesson.id,
      title: lesson.title,
      content: lesson.content ?? null,
      video_url: lesson.video_url ?? null,
      is_free: lesson.is_free,
      completed,
      locked: !lesson.is_free && !isPaid,
      duration: lesson.video_url
        ? `${Math.floor(Math.random() * 20 + 5)}:${String(
            Math.floor(Math.random() * 60)
          ).padStart(2, "0")}`
        : "Unknown",
      thumbnail_url: "https://picsum.photos/600/400",
    };
  } catch (error) {
    console.error("Error fetching lesson by ID:", error);
    throw new Error("Failed to fetch lesson");
  }
}

export async function getCourseLessons(
  courseId: string,
  userId?: string
): Promise<SectionData[]> {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress: userId
                  ? {
                      where: { studentId: userId },
                      select: { isCompleted: true },
                    }
                  : false,
              },
            },
          },
        },
        purchases: userId ? { where: { studentId: userId } } : undefined,
      },
    });

    if (!course) return [];

    const isPaid = userId ? course.purchases.length > 0 : false;

    return course.modules.map((module) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson) => {
        const completed =
          userId && lesson.progress?.length
            ? lesson.progress.some((p) => p.isCompleted)
            : false;

        return {
          id: lesson.id,
          title: lesson.title,
          content: lesson.content ?? null,
          video_url: lesson.video_url ?? null,
          is_free: lesson.is_free,
          completed,
          locked: !lesson.is_free && !isPaid,
          duration: lesson.video_url
            ? `${Math.floor(Math.random() * 20 + 5)}:${String(
                Math.floor(Math.random() * 60)
              ).padStart(2, "0")}`
            : "Unknown",
          thumbnail_url: "https://picsum.photos/600/400",
        };
      }),
    }));
  } catch (error) {
    console.error("Error fetching course lessons:", error);
    throw new Error("Failed to fetch course lessons");
  }
}

export type { LessonData, SectionData };
