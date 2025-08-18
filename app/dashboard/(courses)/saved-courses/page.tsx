"use client";

import { useEffect, useState } from "react";
import { SavedCourseCard } from "./_components/saved-course-card";
import { LumaSpin } from "@/components/luma-spin";

export default function SavedCoursesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedCourses = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/saved-courses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching saved courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full mt-[100px]">
        <LumaSpin />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courses.length > 0 ? (
        courses.map((course) => (
          <SavedCourseCard key={course.id} {...course} isSaved={true} />
        ))
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No saved courses
          </h3>
          <p className="text-gray-600">
            Courses you bookmark will appear here for easy access.
          </p>
        </div>
      )}
    </div>
  );
}
