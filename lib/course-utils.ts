/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/course-utils.ts
import type {
  CourseData,
  CategoryColors,
  CategoryColorMap,
} from "@/app/types/course";

export const getCategoryColors = (categoryName: string): CategoryColors => {
  const colorMap: CategoryColorMap = {
    "AI Calling": { bg: "bg-purple-500/15", text: "text-purple-500" },
    "WhatsApp Chatbots": { bg: "bg-green-500/15", text: "text-green-500" },
    "Make Automations": { bg: "bg-orange-500/15", text: "text-orange-500" },
    "App Development": { bg: "bg-pink-500/15", text: "text-pink-500" },
    "Web Development": { bg: "bg-cyan-400/15", text: "text-cyan-400" },
    "Data Science": { bg: "bg-blue-600/15", text: "text-blue-600" },
    "Machine Learning": { bg: "bg-indigo-500/15", text: "text-indigo-500" },
    Cybersecurity: { bg: "bg-red-500/15", text: "text-red-500" },
    "Cloud Computing": { bg: "bg-sky-500/15", text: "text-sky-500" },
    DevOps: { bg: "bg-emerald-500/15", text: "text-emerald-500" },
  };

  return (
    colorMap[categoryName] || { bg: "bg-gray-500/15", text: "text-gray-500" }
  );
};

export const calculateProgress = (
  completedLessons: number,
  totalLessons: number
): number => {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
};

export const formatCompletedDate = (
  date: Date | string | null
): string | null => {
  if (!date) return null;

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};

export const getUniqueCategories = (courses: CourseData[]): string[] => {
  const categories = courses.map((course) => course.category);
  return ["All", ...Array.from(new Set(categories)).sort()];
};

export const filterCoursesByCategory = (
  courses: CourseData[],
  category: string
): CourseData[] => {
  if (category === "All") return courses;
  return courses.filter((course) => course.category === category);
};

// Type guard to check if a course has progress data
export const hasProgressData = (course: CourseData): boolean => {
  return (
    typeof course.currentLesson === "number" &&
    typeof course.totalLessons === "number" &&
    typeof course.progress === "number"
  );
};

// Validation function for course data
export const validateCourseData = (course: any): course is CourseData => {
  return (
    typeof course.id === "string" &&
    typeof course.category === "string" &&
    typeof course.categoryBgColor === "string" &&
    typeof course.categoryTextColor === "string" &&
    typeof course.title === "string" &&
    typeof course.mentor === "string" &&
    typeof course.currentLesson === "number" &&
    typeof course.totalLessons === "number" &&
    typeof course.progress === "number" &&
    typeof course.image === "string"
  );
};

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
};
