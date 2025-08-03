"use client";

import { useState, useEffect } from "react";
import { CourseData } from "../types/course";

interface UseCourses {
  courses: CourseData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseBrowseCourses extends UseCourses {
  total: number;
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

export function useFilteredCourses(
  courses: CourseData[],
  activeFilter: string
) {
  return activeFilter === "All"
    ? courses
    : courses.filter((course) => course.category === activeFilter);
}

export function useCourseCategories(courses: CourseData[]) {
  const categories = courses.reduce((acc: string[], course) => {
    if (!acc.includes(course.category)) {
      acc.push(course.category);
    }
    return acc;
  }, []);

  return ["All", ...categories];
}

export function useBrowseCourses(
  page: number,
  limit: number = 12,
  filters: Record<string, string> = {}
): UseBrowseCourses {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildQueryString = () => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "All") {
        query.set(key, value);
      }
    }

    return query.toString();
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const query = buildQueryString();
      const res = await fetch(`/api/courses/browse?${query}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCourses(data.courses || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Browse courses error:", err);
      setError("Could not load browse courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page, limit, JSON.stringify(filters)]);

  return { courses, total, loading, error, refetch: fetchCourses };
}
