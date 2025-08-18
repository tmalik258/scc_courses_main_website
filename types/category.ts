import { Category } from "@/lib/generated/prisma";
import { Decimal } from "decimal.js";

// Type for a course within a category (simplified for category context)
export interface CategoryCourse {
  price?: Decimal | string | null;
}

// Type for category with courses included (as returned from API)
export interface CategoryWithCourses extends Category {
  courses: CategoryCourse[];
}

// Type for category with metadata (as returned from getCategoriesWithMeta)
export interface CategoryWithMeta {
  id: string;
  name: string;
  slug: string;
  courseCount: number;
  minPrice: number;
  icon?: string | null;
}