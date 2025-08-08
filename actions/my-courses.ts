"use server";

import axios from "axios";
import { CourseData } from "@/types/course";

export async function getMyCourses(): Promise<CourseData[]> {
  try {
    const response = await axios.get('/api/my-courses');
    return response.data;
  } catch (error) {
    console.error("Error fetching my courses:", error);
    return [];
  }
}
