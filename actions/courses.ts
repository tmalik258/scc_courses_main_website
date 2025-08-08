"use server";

import axios from "axios";
import { CourseData } from "@/types/course";

export async function getPopularCourses(): Promise<CourseData[]> {
  try {
    const response = await axios.get('/api/courses');
    return response.data;
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    return [];
  }
}

export async function getCourseById(courseId: string): Promise<CourseData | null> {
  try {
    const response = await axios.get(`/api/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    return null;
  }
}
