// /app/(routes)/courses/page.tsx
import { Suspense } from "react";
import BrowseCourses from "./BrowseCourses";

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-gray-600">Loading courses...</div>
      }
    >
      <BrowseCourses />
    </Suspense>
  );
}
