// app/api/courses/route.ts

import { NextResponse } from "next/server";
import { getPopularCourses } from "@/actions/get-courses";

export async function GET() {
  try {
    const courses = await getPopularCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error("[GET /api/courses] Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
