import { Suspense } from "react";
import BrowseCourses from "./_components/browse-courses";
import { LumaSpin } from "@/components/luma-spin";

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
          <LumaSpin />
        </div>
      }
    >
      <BrowseCourses />
    </Suspense>
  );
}
