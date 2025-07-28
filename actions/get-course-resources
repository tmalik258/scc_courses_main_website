// actions/get-course-resources.ts
"use server";

import prisma from "../lib/prisma";

export async function getCourseResources(courseId: string) {
  try {
    const resources = await prisma.resources.findMany({
      where: { course_id: courseId },
      select: {
        id: true,
        name: true,
        url: true,
      },
    });

    return resources;
  } catch (error) {
    console.error("Error loading course resources:", error);
    return [];
  }
}
