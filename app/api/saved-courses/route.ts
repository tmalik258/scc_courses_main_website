// app/api/saved-courses/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      include: {
        savedCourses: {
          include: {
            category: true,
            instructor: true,
          },
        },
      },
    });

    if (!profile || !profile.savedCourses || profile.savedCourses.length === 0) {
      return NextResponse.json({ courses: [] });
    }

    const courses = profile.savedCourses.map((course) => ({
      id: course.id,
      category: course.category.name,
      categoryBgColor: "bg-blue-600/25",
      categoryTextColor: "text-blue-600",
      title: course.title,
      mentor: course.instructor.fullName ?? "Unknown Mentor",
      students: "300+ students",
      rating: "4.5/5",
      originalPrice: "₹1,350",
      discountedPrice: "₹1,350",
      image: course.thumbnailUrl ?? "/images/course_placeholder_2.jpg",
    }));

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error in /api/saved-courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
