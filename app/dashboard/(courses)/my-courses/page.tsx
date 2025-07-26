"use client";

import { useEffect, useState } from "react";
import { MyCourseCard } from "./_components/my-course-card";
import type { MyCourseCardProps } from "./_components/my-course-card";
import { getMyCourses } from "@/actions/get-my-courses";

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [courses, setCourses] = useState<MyCourseCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const result = await getMyCourses();
        const typedCourses: MyCourseCardProps[] = result.map((course) => ({
          ...course,
          id: Number(course.id),
          status: course.status as "active" | "finished",
        }));
        setCourses(typedCourses);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "Active") return course.status === "active";
    if (activeTab === "Finished") return course.status === "finished";
    return true;
  });

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-8 border-b border-gray-200">
          {["All", "Active", "Finished"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "border-aqua-mist text-aqua-mist"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500">Loading courses...</div>
      ) : (
        <>
          {/* Course List */}
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <MyCourseCard key={course.id} {...course} />
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No {activeTab.toLowerCase()} courses
              </h3>
              <p className="text-gray-600">
                {activeTab === "Active"
                  ? "You don't have any active courses at the moment."
                  : activeTab === "Finished"
                  ? "You haven't completed any courses yet."
                  : "You haven't enrolled in any courses yet."}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
