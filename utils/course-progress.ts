import prisma from "@/lib/prisma";

export async function getCourseProgress(courseId: string, studentId: string) {
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

  return { completedLessons, totalLessons, progress, isCompleted };
}
