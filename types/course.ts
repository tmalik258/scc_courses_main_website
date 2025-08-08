import {
  Course,
  Category,
  Lessons,
  Profile,
  Review,
  Progress,
  Module,
  Resources,
} from "@/lib/generated/prisma";
import { Decimal } from "decimal.js";

// Extended Course type with computed fields and relationships
export interface CourseData extends Omit<Course, "price"> {
  // Override price to handle both Decimal and string types
  price: Decimal | string | null;

  // Category information
  category: Category;

  // Instructor information
  instructor: Pick<Profile, "id" | "fullName" | "email" | "avatarUrl">;

  // Computed fields for display
  mentor: string;
  students: string;
  rating: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  totalLessons: number;
  purchaseCount: number;
  duration?: string;
  videoCount: number;
  articleCount: number;
  downloadableResources: number;
  projectCount: number;
  practiceTestCount: number;
  learningPoints: string[];

  // Progress and current lesson for user-specific data
  progress?: Progress[];
  currentLesson?: Lessons;

  // Course structure with modules and lessons
  modules: (Module & {
    lessons: (Lessons & {
      resources: Pick<Resources, "name" | "url">[];
    })[];
  })[];

  // Reviews with user information (extended from Prisma Review type)
  reviews?: (Review & {
    student: Pick<Profile, "fullName" | "avatarUrl">;
  })[];
}
