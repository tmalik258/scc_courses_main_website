import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, lessonId } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: "Missing userId or lessonId" },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found for given userId" },
        { status: 404 }
      );
    }

    const studentId = profile.id; // This is what Progress.studentId references

    const existingProgress = await prisma.progress.findUnique({
      where: {
        studentId_lesson_id: {
          studentId,
          lesson_id: lessonId,
        },
      },
    });

    if (existingProgress) {
      await prisma.progress.update({
        where: {
          studentId_lesson_id: {
            studentId,
            lesson_id: lessonId,
          },
        },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
      });
    } else {
      await prisma.progress.create({
        data: {
          studentId,
          lesson_id: lessonId,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
