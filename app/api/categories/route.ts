import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { CategoryWithCourses } from "@/types/category";

export async function GET(): Promise<NextResponse<CategoryWithCourses[] | { message: string }>> {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        courses: {
          where: { isPublished: true },
          select: { price: true },
        },
      },
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error("[GET /api/categories] Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
