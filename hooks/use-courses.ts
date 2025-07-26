"use client";

import { useState, useEffect } from "react";
import { CourseData } from "../types/course";

interface UseCourses {
  courses: CourseData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function usePopularCourses(): UseCourses {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/courses/popular");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data: CourseData[] = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Error loading courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
}

export function useAllCourses(): UseCourses {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data: CourseData[] = await response.json();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Error loading courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
}

// Hook for filtering courses
export function useFilteredCourses(
  courses: CourseData[],
  activeFilter: string
) {
  return activeFilter === "All"
    ? courses
    : courses.filter((course) => course.category === activeFilter);
}

// Hook for course categories
export function useCourseCategories(courses: CourseData[]) {
  const categories = courses.reduce((acc: string[], course) => {
    if (!acc.includes(course.category)) {
      acc.push(course.category);
    }
    return acc;
  }, []);

  return ["All", ...categories];
}
