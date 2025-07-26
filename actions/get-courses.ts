"use server";

import { Prisma } from "../generated/prisma";
import prisma from "@/lib/prisma";
import { CourseData } from "@/types/course";

// Define the type for the Prisma query result
type CourseWithRelations = Prisma.coursesGetPayload<{
  include: {
    categories: { select: { name: true; color: true } };
    profiles: { select: { full_name: true } };
    modules: { include: { lessons: { select: { id: true } } } };
    purchases: { select: { id: true } };
    reviews: { select: { rating: true } };
  };
}>;

export async function getPopularCourses(): Promise<CourseData[]> {
  try {
    const rawCourses = (await prisma.courses.findMany({
      where: { is_published: true },
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
        modules: {
          include: {
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
      take: 8,
    })) as CourseWithRelations[];

    const courses: CourseData[] = rawCourses.map(
      (course: CourseWithRelations) => {
        const totalLessons = course.modules.reduce(
          (sum: number, module: { lessons: { id: string }[] }) =>
            sum + module.lessons.length,
          0
        );

        const studentCount = course.purchases.length;
        const averageRating =
          course.reviews.length > 0
            ? (
                course.reviews.reduce(
                  (sum: number, review: { rating: number }) =>
                    sum + review.rating,
                  0
                ) / course.reviews.length
              ).toFixed(1)
            : "0.0";

        const categoryColor = course.categories?.color || "#3b82f6";
        const categoryBgColor = `bg-[${categoryColor}]/15`;
        const categoryTextColor = `text-[${categoryColor}]`;

        const originalPrice = course.price
          ? parseFloat(course.price.toString())
          : 0;
        const discountPercentage = 20;
        const discountedPrice = originalPrice * (1 - discountPercentage / 100);

        return {
          id: course.id,
          title: course.title ?? "Untitled Course",
          category: course.categories?.name ?? "Unknown",
          categoryBgColor,
          categoryTextColor,
          mentor: course.profiles?.full_name ?? "Unknown Instructor",
          students: `${studentCount}+ students`,
          rating: `${averageRating}/5`,
          price: originalPrice.toFixed(2),
          image: course.thumbnail_url ?? "/images/course_placeholder.jpg",
          thumbnail_url:
            course.thumbnail_url ?? "/images/course_placeholder.jpg",
          originalPrice: originalPrice.toFixed(2),
          discountedPrice: discountedPrice.toFixed(2),
          discount: `${discountPercentage}% OFF`,
          totalLessons,
          purchaseCount: studentCount,
        };
      }
    );

    return courses;
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllCourses(): Promise<CourseData[]> {
  try {
    const rawCourses = (await prisma.courses.findMany({
      where: { is_published: true },
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
        modules: {
          include: {
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
      orderBy: [{ purchases: { _count: "desc" } }, { created_at: "desc" }],
    })) as CourseWithRelations[];

    const courses: CourseData[] = rawCourses.map(
      (course: CourseWithRelations) => {
        const totalLessons = course.modules.reduce(
          (sum: number, module: { lessons: { id: string }[] }) =>
            sum + module.lessons.length,
          0
        );

        const studentCount = course.purchases.length;
        const averageRating =
          course.reviews.length > 0
            ? (
                course.reviews.reduce(
                  (sum: number, review: { rating: number }) =>
                    sum + review.rating,
                  0
                ) / course.reviews.length
              ).toFixed(1)
            : "0.0";

        const categoryColor = course.categories?.color || "#3b82f6";
        const categoryBgColor = `bg-[${categoryColor}]/15`;
        const categoryTextColor = `text-[${categoryColor}]`;

        const originalPrice = course.price
          ? parseFloat(course.price.toString())
          : 0;
        const discountPercentage = 20;
        const discountedPrice = originalPrice * (1 - discountPercentage / 100);

        return {
          id: course.id,
          title: course.title ?? "Untitled Course",
          category: course.categories?.name ?? "Unknown",
          categoryBgColor,
          categoryTextColor,
          mentor: course.profiles?.full_name ?? "Unknown Instructor",
          students: `${studentCount}+ students`,
          rating: `${averageRating}/5`,
          price: originalPrice.toFixed(2),
          image: course.thumbnail_url ?? "/images/course_placeholder.jpg",
          thumbnail_url:
            course.thumbnail_url ?? "/images/course_placeholder.jpg",
          originalPrice: originalPrice.toFixed(2),
          discountedPrice: discountedPrice.toFixed(2),
          discount: `${discountPercentage}% OFF`,
          totalLessons,
          purchaseCount: studentCount,
        };
      }
    );

    return courses;
  } catch (error) {
    console.error("Error fetching all courses:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
