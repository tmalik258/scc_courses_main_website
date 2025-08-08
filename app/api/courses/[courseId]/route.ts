import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, Resources } from "@/lib/generated/prisma";
import { CourseData } from "@/types/course";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        instructor: {
          select: {
            id: true,
            fullName: true,
            email: true,
            avatarUrl: true,
          },
        },
        modules: {
          include: {
            lessons: true,
          },
        },
        purchases: true,
        reviews: true,
        resources: true,
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const totalLessons = course.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
    );

    const studentCount = course.purchases.length;

    const averageRating =
      course.reviews.length > 0
        ? (
            course.reviews.reduce((sum, review) => sum + review.rating, 0) /
            course.reviews.length
          ).toFixed(1)
        : "0.0";

    const originalPrice =
      course.price instanceof Prisma.Decimal
        ? parseFloat(course.price.toFixed(2))
        : typeof course.price === "number"
        ? course.price
        : 0;

    const discountPercentage = 20;
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);

    const durationHours = totalLessons * 10;
    const duration = `${Math.floor(durationHours / 60)}h ${durationHours % 60}m`;

    const lessons = course.modules.flatMap((module) => module.lessons);
    const videoCount = lessons.filter((lesson) => lesson.video_url).length;
    const articleCount = lessons.filter((lesson) => !lesson.video_url).length;
    const downloadableResources = course.resources.length;

    const learningPoints = course.description
      ? course.description
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map((line) => line.replace("- ", ""))
      : [
          "Understand the fundamentals of the course topic",
          "Apply practical skills in real-world scenarios",
        ];

    const transformedCourse: CourseData = {
      ...course,
      // Override specific properties
      category: course.category || {
        id: "unknown",
        name: "Unknown",
        isActive: true,
        createdAt: new Date(),
        description: null,
        slug: "unknown",
        icon: null,
        color: null
      },
      instructor: course.instructor || {
        id: "unknown",
        fullName: "Unknown Instructor",
        email: "unknown@example.com",
        avatarUrl: null
      },
      mentor: course.instructor?.fullName ?? "Unknown Instructor",
      students: `${studentCount}+ students`,
      rating: `${averageRating}/5`,
      price: originalPrice.toFixed(2),
      thumbnailUrl: course.thumbnailUrl ?? "/images/placeholder.jpg",
      originalPrice: originalPrice.toFixed(2),
      discountedPrice: discountedPrice.toFixed(2),
      discount: `${discountPercentage}% OFF`,
      totalLessons,
      purchaseCount: studentCount,
      duration,
      description: course.description ?? "No description available",
      videoCount,
      articleCount,
      downloadableResources,
      projectCount: 0,
      practiceTestCount: 0,
      learningPoints,
      modules: course.modules.map((module) => {
        const transformedModule = {
          ...module,
          lessons: module.lessons.map((lesson) => ({
            ...lesson,
            resources: [] as Pick<Resources, "name" | "url">[],
          })),
        };
        return transformedModule;
      }),
      reviews: course.reviews.map((review) => ({
        ...review,
        student: {
          fullName: "Anonymous Student",
          avatarUrl: "/images/avatar_placeholder.jpg",
        },
      })),
      progress: undefined,
      currentLesson: undefined,
    };

    return NextResponse.json(transformedCourse);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
