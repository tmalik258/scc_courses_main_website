"use server";

import axios from "axios";
import { LessonData, SectionData } from "@/types/lesson";

export async function getLessonById(
  lessonId: string,
  courseId: string,
  userId?: string
): Promise<LessonData | null> {
  try {
    const params = new URLSearchParams({
      courseId,
      ...(userId && { userId }),
    });
    
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/lessons/${lessonId}?${params}`
    );
    
    return response.data;
  } catch (error) {
    console.error("Error loading lesson:", error);
    return null;
  }
}

export async function getCourseLessons(
  courseId: string,
  userId?: string
): Promise<SectionData[]> {
  try {
    const params = new URLSearchParams({
      courseId,
      ...(userId && { userId }),
    });
    
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/lessons?${params}`
    );
    
    return response.data;
  } catch (error) {
    console.error("Error loading course lessons:", error);
    return [];
  }
}
