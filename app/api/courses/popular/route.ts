import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// Define type with related data
type CourseWithRelations = Prisma.coursesGetPayload<{
  include: {
    categories: {
      select: {
        name: true;
        color: true;
      };
    };
    profiles: {
      select: {
        full_name: true;
      };
    };
    purchases: {
      select: {
        id: true;
      };
    };
    reviews: {
      select: {
        rating: true;
      };
    };
  };
}>;

export async function GET() {
  try {
    const courses: CourseWithRelations[] = await prisma.courses.findMany({
      where: {
        is_published: true,
      },
      take: 8,
      orderBy: [{ purchases: { _count: "desc" } }, { created_at: "desc" }],
      include: {
        categories: {
          select: {
            name: true,
            color: true,
          },
        },
        profiles: {
          select: {
            full_name: true,
          },
        },
        purchases: {
          select: {
            id: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const formattedCourses = courses.map((course) => {
      const studentCount = course.purchases?.length || 0;
      const averageRating =
        course.reviews?.length > 0
          ? (
              course.reviews.reduce((sum, review) => sum + review.rating, 0) /
              course.reviews.length
            ).toFixed(1)
          : "0.0";

      const categoryColor = course.categories?.color || "#3b82f6";
      const categoryBgColor = `bg-[${categoryColor}]/15`;
      const categoryTextColor = `text-[${categoryColor}]`;

      return {
        id: course.id,
        category: course.categories?.name || "Uncategorized",
        categoryBgColor,
        categoryTextColor,
        title: course.title,
        mentor: course.profiles?.full_name || "Unknown Instructor",
        students: `${studentCount}+ students`,
        rating: `${averageRating}/5`,
        price: course.price ? course.price.toFixed(2) : "0.00",
        image: course.thumbnail_url || "/images/course_placeholder.jpg",
      };
    });

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
