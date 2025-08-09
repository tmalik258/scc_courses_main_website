"use server";

import axios from "axios";
import { CourseData } from "@/types/course";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getPopularCourses(): Promise<CourseData[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return [];
  }
}

export async function getCourseById(
  courseId: string
): Promise<CourseData | null> {
  try {
    const response = await axios.get(`${BASE_URL}/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return null;
  }
}
