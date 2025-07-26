import { NextResponse } from "next/server";
import { Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

// Define the type for the Prisma query result
type CourseWithRelations = Prisma.coursesGetPayload<{
  include: {
    categories: { select: { name: true; color: true } };
    profiles: { select: { full_name: true } };
    purchases: { select: { id: true } };
    reviews: { select: { rating: true } };
  };
}>;

export async function GET() {
  try {
    // Uncomment this line to skip the `is_published` filter during testing
    // const courses = await prisma.courses.findMany({ ... });

    const courses = (await prisma.courses.findMany({
      // 👉 Remove this condition temporarily if no courses are returned
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
    })) as CourseWithRelations[];

    // Debug raw data
    console.log("Raw courses result:", courses);

    const formattedCourses = courses.map((course: CourseWithRelations) => {
      const studentCount = course.purchases?.length || 0;
      const averageRating =
        course.reviews?.length > 0
          ? (
              course.reviews.reduce(
                (sum: number, review: { rating: number }) =>
                  sum + review.rating,
                0
              ) / course.reviews.length
            ).toFixed(1)
          : "0.0";

      const categoryColor = course.categories?.color || "#3b82f6";

      const originalPrice = course.price
        ? parseFloat(course.price.toString())
        : 0;
      const discountPercentage = 20;
      const discountedPrice = originalPrice * (1 - discountPercentage / 100);

      return {
        id: course.id,
        category: course.categories?.name || "Uncategorized",
        categoryColor: categoryColor,
        categoryBgColor: `bg-[${categoryColor}]/15`, // Not production-safe
        categoryTextColor: `text-[${categoryColor}]`,
        title: course.title,
        mentor: course.profiles?.full_name || "Unknown Instructor",
        students: `${studentCount}+ students`,
        rating: `${averageRating}/5`,
        price: originalPrice.toFixed(2),
        image: course.thumbnail_url || "/images/course_placeholder.jpg",
        thumbnail_url: course.thumbnail_url || "/images/course_placeholder.jpg",
        originalPrice: originalPrice.toFixed(2),
        discountedPrice: discountedPrice.toFixed(2),
        discount: `${discountPercentage}% OFF`,
      };
    });

    // Debug formatted output
    console.log("Formatted courses:", formattedCourses);

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
