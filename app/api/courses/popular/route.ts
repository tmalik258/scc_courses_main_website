import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transformCourse, CourseWithRelations } from "@/lib/course-transformer";

export async function GET() {
  try {
    const rawCourses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      take: 8,
      orderBy: [{ purchases: { _count: "desc" } }, { createdAt: "desc" }],
      include: {
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
          include: {
            lessons: true,
          },
        },
        purchases: {
          select: { id: true },
        },
        reviews: {
          select: { rating: true },
        },
        resources: {
          select: { id: true },
        },
      },
    });

    const courses = rawCourses.map((course) =>
      transformCourse(course as CourseWithRelations)
    );

    return NextResponse.json(courses);
  } catch (error) {
    console.error("[GET /api/courses/popular] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
