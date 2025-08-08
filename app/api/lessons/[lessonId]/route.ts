import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { LessonData } from "@/types/lesson";
import {
  isValidUUID,
  generateRandomDuration,
  mapResources,
} from "@/utils/lesson-utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId") || "";
  const userId = searchParams.get("userId") || "";

  try {
    if (
      !lessonId ||
      !courseId ||
      !isValidUUID(lessonId) ||
      !isValidUUID(courseId)
    ) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
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

    if (!lesson || lesson.modules.courseId !== courseId) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

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

    const lessonData: LessonData = {
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

    return NextResponse.json(lessonData);
  } catch (error) {
    console.error("API error in /api/lessons/[lessonId]:", error);
    return new NextResponse("Failed to fetch lesson", { status: 500 });
  }
}