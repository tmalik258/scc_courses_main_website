import { CategoryWithCourses, CategoryWithMeta } from "@/types/category";
import axios from "axios";

export const getCategoriesWithMeta = async (): Promise<CategoryWithMeta[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`);
    const categories = response.data as CategoryWithCourses[];

    return categories.map((category) => {
      const courseCount = category.courses.length;

      const prices = category.courses
        .map((course) => {
          if (!course.price) return 0;
          if (typeof course.price === "string") return parseFloat(course.price);
          return typeof course.price.toNumber === "function"
            ? course.price.toNumber()
            : 0;
        })
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
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
