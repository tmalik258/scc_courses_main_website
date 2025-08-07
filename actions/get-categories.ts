// actions/categories.ts
import { fetchCategoriesWithCourses } from "@/app/api/categories/route";

export const getCategoriesWithMeta = async () => {
  const categories = await fetchCategoriesWithCourses();

  return categories.map((category) => {
    const courseCount = category.courses.length;

    const prices = category.courses
      .map((course) => course.price?.toNumber() ?? 0)
      .filter((price) => price > 0);

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      courseCount,
      minPrice,
    };
  });
};
