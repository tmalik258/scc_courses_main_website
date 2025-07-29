"use server";

import prisma from "@/lib/prisma";
import { LessonData, SectionData } from "@/types/lesson";

// Validate UUID format
const isValidUUID = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export async function getLessonById(
  lessonId: string,
  courseId: string,
  userId?: string
): Promise<LessonData | null> {
  try {
    if (!lessonId || !courseId) {
      console.error(
        `Invalid input: lessonId=${lessonId}, courseId=${courseId}`
      );
      return null;
    }

    if (!isValidUUID(lessonId) || !isValidUUID(courseId)) {
      console.error(
        `Invalid UUID format: lessonId=${lessonId}, courseId=${courseId}`
      );
      return null;
    }

    const lesson = await prisma.lessons.findUnique({
      where: { id: lessonId },
      include: {
        modules: { select: { courseId: true } },
        progress: userId
          ? { where: { studentId: userId }, select: { isCompleted: true } }
          : undefined,
      },
    });

    if (!lesson) {
      console.error(`Lesson not found in database: lessonId=${lessonId}`);
      return null;
    }

    if (lesson.modules.courseId !== courseId) {
      console.error(
        `Lesson does not belong to course: lessonId=${lessonId}, courseId=${courseId}, moduleCourseId=${lesson.modules.courseId}`
      );
      return null;
    }

    const profile = userId
      ? await prisma.profile.findUnique({
          where: { userId },
          select: { id: true },
        })
      : null;

    const studentId = profile?.id;
    if (userId && !studentId) {
      console.warn(`No profile found for userId=${userId}`);
    }

    const isPaid =
      userId && studentId
        ? Boolean(
            await prisma.purchase.findFirst({
              where: { courseId, studentId },
            })
          )
        : false;

    const resources = await prisma.resources.findMany({
      where: { course_id: courseId },
    });

    const completed =
      userId && lesson.progress?.length
        ? lesson.progress.some((p: { isCompleted: boolean }) => p.isCompleted)
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
      resources: resources.map((r) => ({
        id: r.id,
        name: r.name,
        url: r.url,
      })),
    };
  } catch (error) {
    console.error(
      `Error fetching lesson by ID: lessonId=${lessonId}, courseId=${courseId}, userId=${userId}`,
      error
    );
    throw new Error("Failed to fetch lesson");
  }
}

export async function getCourseLessons(
  courseId: string,
  userId?: string
): Promise<SectionData[]> {
  try {
    if (!courseId) {
      console.error(`Invalid input: courseId=${courseId}`);
      return [];
    }

    if (!isValidUUID(courseId)) {
      console.error(`Invalid UUID format: courseId=${courseId}`);
      return [];
    }

    const profile = userId
      ? await prisma.profile.findUnique({
          where: { userId },
          select: { id: true },
        })
      : null;

    const studentId = profile?.id;
    if (userId && !studentId) {
      console.warn(`No profile found for userId=${userId}`);
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                progress:
                  userId && studentId
                    ? {
                        where: { studentId },
                        select: { isCompleted: true },
                      }
                    : undefined,
              },
            },
          },
        },
        purchases: userId && studentId ? { where: { studentId } } : undefined,
      },
    });

    if (!course) {
      console.error(`Course not found in database: courseId=${courseId}`);
      return [];
    }

    const isPaid = userId && studentId ? course.purchases.length > 0 : false;

    const resources = await prisma.resources.findMany({
      where: { course_id: courseId },
    });

    return course.modules.map((module) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson) => {
        const completed =
          userId && lesson.progress?.length
            ? lesson.progress.some(
                (p: { isCompleted: boolean }) => p.isCompleted
              )
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
          resources: resources.map((r) => ({
            id: r.id,
            name: r.name,
            url: r.url,
          })),
        };
      }),
    }));
  } catch (error) {
    console.error(
      `Error fetching course lessons: courseId=${courseId}, userId=${userId}`,
      error
    );
    throw new Error("Failed to fetch course lessons");
  }
}
