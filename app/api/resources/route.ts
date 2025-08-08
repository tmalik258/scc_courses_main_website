import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    
    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }
    
    const resources = await prisma.resources.findMany({
      where: { course_id: courseId },
      select: {
        id: true,
        name: true,
        url: true,
      },
    });
    
    return NextResponse.json(resources);
  } catch (error) {
    console.error("[GET /api/resources] Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
