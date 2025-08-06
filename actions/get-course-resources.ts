// actions/get-course-resources.ts
"use server";

import { fetchCourseResources } from "@/app/api/resources/route";

export async function getCourseResources(courseId: string) {
  try {
    const resources = await fetchCourseResources(courseId);
    return resources;
  } catch (error) {
    console.error("Error loading course resources:", error);
    return [];
  }
}
