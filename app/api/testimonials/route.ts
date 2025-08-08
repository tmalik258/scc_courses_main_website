import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        student: {
          select: {
            fullName: true,
            avatarUrl: true,
            role: true,
          },
        },
      },
    });

    const formattedTestimonials = testimonials.map((review) => ({
      id: review.id,
      courseId: review.course.id,
      courseTitle: review.course.title,
      name: review.student.fullName ?? "Anonymous",
      title: review.student.role === "STUDENT" ? "Student" : "Instructor",
      rating: review.rating,
      review: review.comment ?? "",
      avatar:
        review.student.avatarUrl ??
        "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
    }));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error("[GET /api/testimonials] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
