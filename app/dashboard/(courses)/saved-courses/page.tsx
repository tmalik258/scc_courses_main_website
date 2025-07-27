// app/dashboard/saved/page.tsx (or wherever this file lives)
import { redirect } from "next/navigation";
import { getSavedCourses } from "@/actions/get-saved-courses";
import { SavedCourseCard } from "./_components/saved-course-card";
import { supabase } from "@/scc_courses_main_website/lib/supabase";

export default async function SavedCoursePage() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return redirect("/login");
  }

  const savedCourses = await getSavedCourses(user.id);

  return (
    <div className="space-y-6">
      {savedCourses.length > 0 ? (
        savedCourses.map((course) => (
          <SavedCourseCard key={course.id} {...course} />
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
