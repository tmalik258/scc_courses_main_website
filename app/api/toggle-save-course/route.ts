// /app/api/toggle-save-course/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "Missing userId or courseId" },
        { status: 400 }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { savedCourses: true },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const alreadySaved = profile.savedCourses.some(
      (course) => course.id === courseId
    );

    let updatedProfile;
    if (alreadySaved) {
      updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          savedCourses: {
            disconnect: { id: courseId },
          },
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          savedCourses: {
            connect: { id: courseId },
          },
        },
      });
    }

    return NextResponse.json({ success: true, saved: !alreadySaved });
  } catch (error) {
    console.error("Toggle save error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
