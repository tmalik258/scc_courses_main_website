import prisma from "../lib/prisma";
import { unstable_noStore as noStore } from "next/cache"; // optional for fresh data

export async function getSavedCourses(userId: string) {
  noStore(); // disables caching if needed

  const purchases = await prisma.purchases.findMany({
    where: {
      student_id: userId,
    },
    include: {
      courses: {
        include: {
          categories: true,
          profiles: true,
        },
      },
    },
  });

  return purchases.map((purchase) => {
    const course = purchase.courses;

    return {
      id: course.id,
      category: course.categories.name,
      categoryBgColor: "bg-blue-600/25",
      categoryTextColor: "text-blue-600",
      title: course.title,
      mentor: course.profiles.full_name ?? "Unknown Mentor",
      students: "300+ students",
      rating: "4.5/5",
      originalPrice: "₹1,350",
      discountedPrice: "₹1,350",
      image: course.thumbnail_url ?? "/images/course_placeholder_2.jpg",
    };
  });
}
