// actions/get-saved-courses.ts
import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function getSavedCourses(userId: string) {
  noStore();

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      savedCourses: {
        include: {
          category: true,
          instructor: true,
        },
      },
    },
  });

  if (!profile || !profile.savedCourses || profile.savedCourses.length === 0) {
    return [];
  }

  return profile.savedCourses.map((course) => ({
    id: course.id,
    category: course.category.name,
    categoryBgColor: "bg-blue-600/25",
    categoryTextColor: "text-blue-600",
    title: course.title,
    mentor: course.instructor.fullName ?? "Unknown Mentor",
    students: "300+ students",
    rating: "4.5/5",
    originalPrice: "₹1,350",
    discountedPrice: "₹1,350",
    image: course.thumbnailUrl ?? "/images/course_placeholder_2.jpg",
  }));
}
