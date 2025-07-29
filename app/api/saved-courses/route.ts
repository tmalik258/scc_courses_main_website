// app/api/saved-courses/route.ts
import { NextResponse } from "next/server";
import { getUserProfile } from "@/actions/get-user-profile";
import { getSavedCourses } from "@/actions/get-saved-courses";

export async function POST() {
  try {
    const profile = await getUserProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const courses = await getSavedCourses(profile.userId);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error in /api/saved-courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
