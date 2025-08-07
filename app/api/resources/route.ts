// api/resources.ts
import prisma from "@/lib/prisma";

export const fetchCourseResources = async (courseId: string) => {
  return await prisma.resources.findMany({
    where: { course_id: courseId },
    select: {
      id: true,
      name: true,
      url: true,
    },
  });
};
