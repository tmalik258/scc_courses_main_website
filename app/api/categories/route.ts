// api/categories.ts
import prisma from "@/lib/prisma";

export const fetchCategoriesWithCourses = async () => {
  return await prisma.category.findMany({
    where: { isActive: true },
    include: {
      courses: {
        where: { isPublished: true },
        select: { price: true },
      },
    },
  });
};
