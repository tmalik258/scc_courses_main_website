// /app/api/toggle-save-course/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, courseId } = body;

    console.log("🔹 Incoming toggle-save request:", { userId, courseId });

    if (!userId || !courseId) {
      console.warn("⛔ Missing userId or courseId");
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
      console.warn("⚠️ Profile not found for userId:", userId);
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const alreadySaved = profile.savedCourses.some(
      (course) => course.id === courseId
    );

    console.log("🔍 alreadySaved =", alreadySaved);

    let updatedProfile;

    if (alreadySaved) {
      console.log("🔄 Removing saved course...");
      updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          savedCourses: {
            disconnect: { id: courseId },
          },
        },
      });
    } else {
      console.log(" Adding saved course...");
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

    console.log("✅ Profile updated. Saved state is now:", !alreadySaved);

    return NextResponse.json({ success: true, saved: !alreadySaved });
  } catch (error) {
    console.error("🔥 Toggle save error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
