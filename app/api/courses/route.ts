import { NextResponse } from "next/server";
import { getBrowseCourses } from "@/actions/get-courses";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 12);

    const filters: Record<string, string> = {};
    ["category", "q", "sort", "price", "rating"].forEach((key) => {
      const value = searchParams.get(key);
      if (value && value !== "All") {
        filters[key] = value;
      }
    });

    const { courses, total } = await getBrowseCourses(page, limit, filters);
    return NextResponse.json({ courses, total });
  } catch (error) {
    console.error("Browse API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
