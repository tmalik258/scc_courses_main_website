"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated/prisma";
import { CourseData } from "@/types/course";

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

type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    category: { select: { name: true } };
    instructor: { select: { fullName: true } };
    modules: { include: { lessons: true } };
    purchases: true;
    reviews: true;
    resources: true;
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
  const durationHours = totalLessons * 10;
  const duration = `${Math.floor(durationHours / 60)}h ${durationHours % 60}m`;
  const lessons = course.modules.flatMap((module) => module.lessons);
  const videoCount = lessons.filter((l) => l.video_url).length;
  const articleCount = lessons.filter((l) => !l.video_url).length;
  const learningPoints = course.description
    ? course.description
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => line.replace("- ", ""))
    : [
        "Understand the fundamentals of the course topic",
        "Apply practical skills in real-world scenarios",
      ];

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
    videoCount,
    articleCount,
    downloadableResources: course.resources.length,
    projectCount: 0,
    practiceTestCount: 0,
    learningPoints,
    sections: course.modules.map((module) => ({
      id: module.id,
      title: module.title,
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        completed: false,
        locked: !lesson.is_free,
        duration: "0:00",
        content: lesson.content,
        video_url: lesson.video_url,
        is_free: lesson.is_free,
        resources: [],
      })),
    })),
    reviews: course.reviews.map((review) => ({
      id: review.id,
      name: "",
      title: "Student",
      rating: review.rating,
      review: review.comment ?? "",
      avatar: "/images/avatar_placeholder.jpg",
    })),
    progress: 0,
    currentLesson: null,
  };
}

export async function getPopularCourses(): Promise<CourseData[]> {
  const rawCourses = await prisma.course.findMany({
    where: { isPublished: true },
    include: {
      category: { select: { name: true } },
      instructor: { select: { fullName: true } },
      modules: { include: { lessons: true } },
      purchases: true,
      reviews: true,
      resources: true,
    },
    orderBy: {
      purchases: {
        _count: "desc",
      },
    },
  });

  return rawCourses.map(transformCourse);
}

export async function getBrowseCourses(
  page = 1,
  limit = 12,
  filters: Record<string, string> = {}
): Promise<{ courses: CourseData[]; total: number }> {
  const where: Prisma.CourseWhereInput = {
    isPublished: true,
    category:
      filters.category && filters.category !== "All"
        ? { name: filters.category }
        : undefined,
    title: filters.q
      ? { contains: filters.q, mode: "insensitive" as const }
      : undefined,
    price:
      filters.price === "Free"
        ? 0
        : filters.price === "Paid"
        ? { gt: 0 }
        : undefined,
  };

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        category: { select: { name: true } },
        instructor: { select: { fullName: true } },
        modules: { include: { lessons: true } },
        purchases: true,
        reviews: true,
        resources: true,
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.course.count({ where }),
  ]);

  return {
    courses: courses.map(transformCourse),
    total,
  };
}

export async function getCourseById(
  courseId: string
): Promise<CourseData | null> {
  const course = await prisma.course.findUnique({
    where: { id: courseId, isPublished: true },
    include: {
      category: { select: { name: true } },
      instructor: { select: { fullName: true } },
      modules: { include: { lessons: true } },
      purchases: true,
      reviews: true,
      resources: true,
    },
  });

  if (!course) return null;

  return transformCourse(course);
}
