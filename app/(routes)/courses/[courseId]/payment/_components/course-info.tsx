"use client";

import { useState, useEffect } from "react";
import { Users, Star, Clock } from "lucide-react";
import { CourseData } from "@/types/course";

interface CourseInfoProps {
  course: CourseData | null;
}

export function CourseInfo({ course }: CourseInfoProps) {
  const [courseData, setCourseData] = useState<CourseData | null>(course);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCourseData(course);
  }, [course]);

  if (error || !course) {
    return (
      <div className="text-red-500">
        {error || "Course not found"}
        <button
          className="ml-4 text-blue-500 underline"
          onClick={() => {
            console.log(`[CourseInfo ${courseData?.id}] Retrying fetch`);
            setError(null);
            setCourseData(null);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Category Badge */}
      <div>
        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded font-medium">
          {course.category.name}
        </span>
      </div>

      {/* Course Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
        {course.title}
      </h1>

      {/* Course Stats */}
      <div className="flex items-center max-md:justify-between md:gap-6 text-xs md:text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-orange-500" />
          <span>{course.students}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>{course.rating}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>{course.duration || "Duration not available"}</span>
        </div>
      </div>

      {/* Description */}
      <div
        className="text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: course.description || "No description available",
        }}
      />

      {/* Pricing */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 line-through md:text-lg">
          ₹{course.originalPrice}
        </span>
        <span className="text-aqua-mist font-bold text-lg md:text-2xl">
          ₹{course.discountedPrice}
        </span>
        <span className="bg-red-100 min-w-fit text-red-600 text-xs md:text-sm px-2 py-1 rounded font-medium">
          {course.discount}
        </span>
      </div>
    </div>
  );
}
