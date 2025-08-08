import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserProfile } from "@/actions/user-profile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId } = body;

    const profile = await getUserProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = profile.userId;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
      include: { savedCourses: true },
    });

    if (!existingProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const alreadySaved = existingProfile.savedCourses.some(
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
