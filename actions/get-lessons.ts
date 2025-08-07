"use server";

import prisma from "@/lib/prisma";
import { LessonData, SectionData } from "@/types/lesson";
import {
  isValidUUID,
  generateRandomDuration,
  mapResources,
} from "@/utils/lesson-utils";

export async function getLessonById(
  lessonId: string,
  courseId: string,
  userId?: string
): Promise<LessonData | null> {
  if (
    !lessonId ||
    !courseId ||
    !isValidUUID(lessonId) ||
    !isValidUUID(courseId)
  )
    return null;

  const lesson = await prisma.lessons.findUnique({
    where: { id: lessonId },
    include: {
      modules: { select: { courseId: true } },
      progress: userId
        ? { where: { studentId: userId }, select: { isCompleted: true } }
        : undefined,
    },
  });

  if (!lesson || lesson.modules.courseId !== courseId) return null;

  const profile = userId
    ? await prisma.profile.findUnique({
        where: { userId },
        select: { id: true },
      })
    : null;
  const studentId = profile?.id;

  const isPaid =
    userId && studentId
      ? !!(await prisma.purchase.findFirst({ where: { courseId, studentId } }))
      : false;

  const resources = await prisma.resources.findMany({
    where: { course_id: courseId },
  });

  return {
    id: lesson.id,
    title: lesson.title,
    content: lesson.content ?? null,
    video_url: lesson.video_url ?? null,
    is_free: lesson.is_free,
    completed: lesson.progress?.some((p) => p.isCompleted) ?? false,
    locked: !lesson.is_free && !isPaid,
    duration: lesson.video_url ? generateRandomDuration() : "Unknown",
    resources: mapResources(resources),
  };
}

export async function getCourseLessons(
  courseId: string,
  userId?: string
): Promise<SectionData[]> {
  if (!courseId || !isValidUUID(courseId)) return [];

  const profile = userId
    ? await prisma.profile.findUnique({
        where: { userId },
        select: { id: true },
      })
    : null;
  const studentId = profile?.id;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              progress:
                userId && studentId
                  ? { where: { studentId }, select: { isCompleted: true } }
                  : undefined,
            },
          },
        },
      },
      purchases: userId && studentId ? { where: { studentId } } : undefined,
    },
  });

  if (!course) return [];

  const isPaid = userId && studentId ? course.purchases.length > 0 : false;
  const resources = await prisma.resources.findMany({
    where: { course_id: courseId },
  });

  return course.modules.map((module) => ({
    id: module.id,
    title: module.title,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      content: lesson.content ?? null,
      video_url: lesson.video_url ?? null,
      is_free: lesson.is_free,
      completed: lesson.progress?.some((p) => p.isCompleted) ?? false,
      locked: !lesson.is_free && !isPaid,
      duration: lesson.video_url ? generateRandomDuration() : "Unknown",
      resources: mapResources(resources),
    })),
  }));
}
