import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transformCourse } from "@/lib/course-transformer";

export async function GET() {
  try {
    const rawCourses = await prisma.course.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        description: true,
        instructorId: true,
        categoryId: true,
        thumbnailUrl: true,
        price: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            slug: true,
            icon: true,
            color: true,
            isActive: true,
          },
        },
        instructor: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatarUrl: true,
            bio: true,
            createdAt: true,
            phone: true,
          },
        },
        modules: {
          include: { lessons: true },
        },
        purchases: { select: { id: true } },
        reviews: { select: { rating: true } },
        resources: { select: { id: true } },
      },
      orderBy: { purchases: { _count: "desc" } },
    });

    const courses = rawCourses.map((course) =>
      transformCourse({
        ...course,
        thumbnailUrl: course.thumbnailUrl ?? "/images/course_placeholder.jpg",
      })
    );

    return NextResponse.json(courses);
  } catch (error) {
    console.error("[GET /api/courses] Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
