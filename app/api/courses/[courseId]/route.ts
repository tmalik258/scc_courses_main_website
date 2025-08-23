import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transformCourse } from "@/lib/course-transformer";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
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

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const transformedCourse = transformCourse({
      ...course,
      thumbnailUrl: course.thumbnailUrl ?? "/images/course_placeholder.jpg",
    });

    return NextResponse.json(transformedCourse);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
