"use client";

import { useEffect } from "react";
import { Users, Star, Clock } from "lucide-react";
import { CourseData } from "@/types/course";

interface CourseInfoProps {
  course: CourseData | null;
  courseId: string;
  retryFetch: () => Promise<void>;
}

export function CourseInfo({ course, courseId, retryFetch }: CourseInfoProps) {
  useEffect(() => {
    if (!course) {
      console.log(`[CourseInfo ${courseId}] Course data missing`);
    } else {
      console.log(
        `[CourseInfo ${courseId}] Course description:`,
        course.description
      );
    }
  }, [course, courseId]);

  if (!course) {
    return (
      <div className="text-red-500">
        Course not found
        <button
          className="ml-4 text-blue-500 underline"
          onClick={() => {
            console.log(`[CourseInfo ${courseId}] Retrying fetch`);
            retryFetch();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const hasDescription = course.description && course.description.trim() !== "";

  return (
    <div className="space-y-4">
      <div>
        <span className="bg-blue-100 text-blue-800 text-base px-3 py-1 rounded font-medium">
          {course.category.name}
        </span>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">{course.title}</h1>
      <div className="flex items-center max-md:justify-between md:gap-6 text-base text-gray-600">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-500" />
          <span>{course.students}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span>{course.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span>{course.duration || "Duration not available"}</span>
        </div>
      </div>
      {hasDescription ? (
        <div
          className="text-gray-600 leading-relaxed text-base"
          dangerouslySetInnerHTML={{
            __html: course.description as string,
          }}
        />
      ) : (
        <p className="text-gray-600 leading-relaxed text-base">
          No description available
        </p>
      )}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 line-through text-lg md:text-xl">
          ₹{course.originalPrice}
        </span>
        <span className="text-aqua-mist font-bold text-lg md:text-2xl">
          ₹{course.discountedPrice}
        </span>
        <span className="bg-red-100 min-w-fit text-red-600 text-sm md:text-base px-3 py-1 rounded font-medium">
          {course.discount}
        </span>
      </div>
    </div>
  );
}
