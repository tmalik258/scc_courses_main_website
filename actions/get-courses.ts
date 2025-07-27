"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { CourseData } from "@/types/course";

// Define the type for course with relations
type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    category: {
      select: {
        name: true;
        color: true;
      };
    };
    instructor: {
      select: {
        fullName: true;
      };
    };
    modules: {
      include: {
        lessons: true;
      };
    };
    purchases: true;
    reviews: true;
  };
}>;

function transformCourse(course: CourseWithRelations): CourseData {
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

  const categoryColor = course.category?.color || "#3b82f6";
  const categoryBgColor = `bg-[${categoryColor}]/15`;
  const categoryTextColor = `text-[${categoryColor}]`;

  const originalPrice =
    course.price instanceof Prisma.Decimal
      ? parseFloat(course.price.toFixed(2))
      : typeof course.price === "number"
      ? course.price
      : 0;

  const discountPercentage = 20;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  return {
    id: course.id,
    title: course.title,
    category: course.category?.name ?? "Unknown",
    categoryBgColor,
    categoryTextColor,
    mentor: course.instructor?.fullName ?? "Unknown Instructor",
    students: `${studentCount}+ students`,
    rating: `${averageRating}/5`,
    price: originalPrice.toFixed(2),
    image: course.thumbnailUrl ?? "/images/placeholder.jpg",
    thumbnail_url: course.thumbnailUrl ?? "/images/placeholder.jpg",
    originalPrice: originalPrice.toFixed(2),
    discountedPrice: discountedPrice.toFixed(2),
    discount: `${discountPercentage}% OFF`,
    totalLessons,
    purchaseCount: studentCount,
  };
}

export async function getPopularCourses(): Promise<CourseData[]> {
  try {
    const rawCourses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      include: {
        category: {
          select: {
            name: true,
            color: true,
          },
        },
        instructor: {
          select: {
            fullName: true,
          },
        },
        modules: {
          include: {
            lessons: true,
          },
        },
        purchases: true,
        reviews: true,
      },
      orderBy: {
        purchases: {
          _count: "desc",
        },
      },
    });

    return rawCourses.map(transformCourse);
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error("Failed to fetch popular courses");
  }
}
