"use client";

import { useEffect, useState } from "react";
import { SavedCourseCard } from "./_components/saved-course-card";
import { createClient } from "@/utils/supabase/client";

export default function SavedCoursesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedCourses = async () => {
      const supabase = await createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && !error) {
        const res = await fetch("/api/saved-courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();
        setCourses(data.courses || []);
      }

      setLoading(false);
    };

    fetchSavedCourses();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
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
