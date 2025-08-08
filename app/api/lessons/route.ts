import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SectionData } from "@/types/lesson";
import {
  isValidUUID,
  generateRandomDuration,
  mapResources,
} from "@/utils/lesson-utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId") || "";
  const userId = searchParams.get("userId") || "";

  try {
    if (!courseId || !isValidUUID(courseId)) {
      return NextResponse.json([], { status: 200 });
    }

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

    if (!course) {
      return NextResponse.json([], { status: 200 });
    }

    const isPaid = userId && studentId ? course.purchases.length > 0 : false;
    const resources = await prisma.resources.findMany({
      where: { course_id: courseId },
    });

    const modules: SectionData[] = course.modules.map((module) => ({
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

    return NextResponse.json(modules);
  } catch (error) {
    console.error("API error in /api/lessons:", error);
    return new NextResponse("Failed to fetch lessons", { status: 500 });
  }
}
