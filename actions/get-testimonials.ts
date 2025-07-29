"use server";

import prisma from "@/lib/prisma";

export async function getTestimonials() {
  const testimonials = await prisma.review.findMany({
    where: {
      isPublic: true,
      rating: { gte: 4 },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    select: {
      id: true,
      rating: true,
      comment: true,
      student: {
        select: {
          fullName: true,
          avatarUrl: true,
          role: true,
        },
      },
    },
  });

  return testimonials.map((review) => ({
    id: review.id,
    name: review.student.fullName ?? "Anonymous",
    title: review.student.role === "STUDENT" ? "Student" : "Instructor",
    rating: review.rating,
    review: review.comment ?? "",
    avatar:
      review.student.avatarUrl ??
      "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
  }));
}
