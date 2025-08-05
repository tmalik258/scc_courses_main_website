"use client";

import { useState, useEffect } from "react";
import { Users, Star, Clock } from "lucide-react";
import { CourseData } from "@/types/course";
import { getCourseById } from "@/actions/get-courses";
import { DashedSpinner } from "@/components/dashed-spinner";

interface CourseInfoProps {
  courseId: string | undefined;
}

export function CourseInfo({ courseId }: CourseInfoProps) {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(`[CourseInfo] Received courseId:`, courseId, {
      isValid: typeof courseId === "string" && courseId.trim() !== "",
    });
    async function fetchCourse() {
      try {
        setLoading(true);
        if (
          !courseId ||
          typeof courseId !== "string" ||
          courseId.trim() === ""
        ) {
          throw new Error(`Invalid or missing courseId: ${courseId}`);
        }
        const courseData = await getCourseById(courseId);
        console.log(
          `[CourseInfo ${courseId}] Course data fetched:`,
          courseData
        );
        if (courseData) {
          setCourse(courseData);
        } else {
          setError("Course not found");
          console.warn(`[CourseInfo ${courseId}] No course data returned`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load course data";
        setError(errorMessage);
        console.error(
          `[CourseInfo ${courseId || "unknown"}] Error fetching course:`,
          err
        );
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (!courseId || typeof courseId !== "string" || courseId.trim() === "") {
    console.error(`[CourseInfo] Invalid courseId at render:`, courseId);
    return (
      <div className="text-red-500">
        Invalid course ID
        <button
          className="ml-4 text-blue-500 underline"
          onClick={() => {
            console.log(`[CourseInfo] Retrying fetch with courseId:`, courseId);
            setLoading(true);
            setError(null);
            setCourse(null);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-48 text-gray-500">
        <DashedSpinner size={24} />
        Loading course...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-red-500">
        {error || "Course not found"}
        <button
          className="ml-4 text-blue-500 underline"
          onClick={() => {
            console.log(`[CourseInfo ${courseId}] Retrying fetch`);
            setLoading(true);
            setError(null);
            setCourse(null);
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
        <span
          className={`${course.categoryBgColor} ${course.categoryTextColor} text-sm px-3 py-1 rounded font-medium`}
        >
          {course.category}
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
      <p className="text-gray-600 leading-relaxed">
        {course.description || "No description available"}
      </p>

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
