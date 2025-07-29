// /app/api/saved-courses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSavedCourses } from "@/actions/get-saved-courses";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const courses = await getSavedCourses(userId);
  return NextResponse.json({ courses });
}
