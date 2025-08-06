import { NextResponse } from "next/server";
import { getCourseLessons } from "@/actions/get-lessons";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId") || "";
  const userId = searchParams.get("userId") || "";

  try {
    const sections = await getCourseLessons(courseId, userId);
    return NextResponse.json(sections);
  } catch (error) {
    console.error("API error in /api/lessons:", error);
    return new NextResponse("Failed to fetch lessons", { status: 500 });
  }
}
