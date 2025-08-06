import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  // Fetch or create user profile
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

  // Fetch purchases and certificates
  const [purchases, certificates] = await prisma.$transaction([
    prisma.purchase.findMany({
      where: { studentId },
      select: {
        course: {
          select: {
            id: true,
            title: true,
            category: {
              select: {
                name: true,
              },
            },
            instructor: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    }),
    prisma.certificate.findMany({
      where: { studentId },
      select: {
        courseId: true,
      },
    }),
  ]);

  // Fetch progress for each course
  const courseProgress = await Promise.all(
    purchases.map(async (purchase) => {
      const courseId = purchase.course.id;
      const [completedLessons, totalLessons] = await Promise.all([
        prisma.progress.count({
          where: {
            studentId,
            isCompleted: true,
            lessons: {
              modules: {
                courseId,
              },
            },
          },
        }),
        prisma.lessons.count({
          where: {
            modules: {
              courseId,
            },
          },
        }),
      ]);

      return {
        courseId,
        completedLessons,
        totalLessons: totalLessons || 1,
      };
    })
  );

  return NextResponse.json({
    profile,
    purchases,
    certificates,
    courseProgress,
  });
}
