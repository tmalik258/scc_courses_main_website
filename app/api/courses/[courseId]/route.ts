import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    select: {
      title: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
