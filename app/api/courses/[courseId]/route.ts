import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const course = await prisma.courses.findUnique({
    where: { id: params.courseId },
    select: {
      title: true,
      categories: {
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
