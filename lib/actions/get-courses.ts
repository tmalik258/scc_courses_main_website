"use server";

import { prisma } from "@/lib/db";
import { CourseData } from "@/app/types/course";

export async function getPopularCourses(): Promise<CourseData[]> {
  try {
    const rawCourses = await prisma.courses.findMany({
      where: { is_published: true },
      select: {
        id: true,
        title: true,
        thumbnail_url: true,
        price: true,
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
        modules: {
          select: {
            lessons: {
              select: {
                id: true,
              },
            },
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
      orderBy: {
        purchases: {
          _count: "desc",
        },
      },
      take: 12,
    });

    const courses: CourseData[] = rawCourses.map((course) => {
      const totalLessons = course.modules.reduce(
        (sum, module) => sum + module.lessons.length,
        0
      );

      const averageRating =
        course.reviews.length > 0
          ? (
              course.reviews.reduce((sum, review) => sum + review.rating, 0) /
              course.reviews.length
            ).toFixed(1)
          : "0.0";

      return {
        id: course.id,
        title: course.title ?? "Untitled Course",
        category: course.categories?.name ?? "Unknown",
        categoryBgColor: course.categories?.color
          ? `bg-[${course.categories.color}]/15`
          : "bg-gray-100",
        categoryTextColor: course.categories?.color
          ? `text-[${course.categories.color}]`
          : "text-gray-800",
        mentor: course.profiles?.full_name ?? "Unknown Instructor",
        totalLessons,
        image: course.thumbnail_url ?? "/images/course_placeholder.jpg",
        rating: averageRating,
        price: course.price?.toString() ?? "0.00",
        purchaseCount: course.purchases.length,
      };
    });

    return courses;
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return [];
  }
}
