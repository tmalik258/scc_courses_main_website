"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { CourseData } from "@/types/course";

// Color mapping for categories
const categoryColors: Record<string, { bgColor: string; textColor: string }> = {
  "AI Calling": { bgColor: "bg-purple-100", textColor: "text-purple-600" },
  "WhatsApp Chatbots": { bgColor: "bg-green-100", textColor: "text-green-600" },
  "Make Automations": {
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
  "App Development": { bgColor: "bg-pink-100", textColor: "text-pink-600" },
  "Web Development": { bgColor: "bg-cyan-100", textColor: "text-aqua-depth" },
  "Data Science": { bgColor: "bg-blue-100", textColor: "text-blue-600" },
};

// Define the type for course with relations
type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    category: {
      select: {
        name: true;
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

  const categoryName = course.category?.name ?? "Unknown";
  const { bgColor: categoryBgColor, textColor: categoryTextColor } =
    categoryColors[categoryName] || {
      bgColor: "bg-gray-100",
      textColor: "text-gray-600",
    };

  const originalPrice =
    course.price instanceof Prisma.Decimal
      ? parseFloat(course.price.toFixed(2))
      : typeof course.price === "number"
      ? course.price
      : 0;

  const discountPercentage = 20;
  const discountedPrice = originalPrice * (1 - discountPercentage / 100);

  // Calculate approximate duration based on number of lessons (e.g., 1 hour per lesson)
  const durationHours = totalLessons; // Assuming 1 hour per lesson; adjust as needed
  const duration = `${durationHours} hours duration`;

  return {
    id: course.id,
    title: course.title,
    category: categoryName,
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
    duration,
    description: course.description ?? "No description available",
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

export async function getCourseById(
  courseId: string
): Promise<CourseData | null> {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        category: {
          select: {
            name: true,
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
    });

    if (!course) {
      return null;
    }

    return transformCourse(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw new Error("Failed to fetch course");
  }
}
