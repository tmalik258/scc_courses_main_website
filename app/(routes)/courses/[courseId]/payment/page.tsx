"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CourseBenefits } from "./_components/course-benefits";
import { CourseImage } from "./_components/course-image";
import { CourseInfo } from "./_components/course-info";
import { CourseNotes } from "./_components/course-notes";
import { PaymentSummary } from "./_components/payment-summary";
import { PromoCode } from "./_components/promo-code";
import { getCourseById } from "@/actions/get-courses";
import { CourseData } from "@/types/course";
import { DashedSpinner } from "@/components/dashed-spinner";
import React from "react";

export default function PaymentPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { courseId } = React.use(params);

  useEffect(() => {
    console.log(`[PaymentPage] Received courseId:`, courseId);
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
          `[PaymentPage ${courseId}] Course data fetched:`,
          courseData
        );
        if (courseData) {
          setCourse(courseData);
        } else {
          setError("Course not found");
          console.warn(`[PaymentPage ${courseId}] No course data returned`);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load course data";
        setError(errorMessage);
        console.error(
          `[PaymentPage ${courseId || "unknown"}] Error fetching course:`,
          err
        );
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 text-gray-500 z-50">
        <div className="flex flex-col items-center">
          <DashedSpinner size={32} />
          <span className="mt-2">Loading payment page...</span>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
        {error || "Course not found"}
        <button
          className="ml-4 text-blue-500 underline"
          onClick={() => {
            console.log(`[PaymentPage ${courseId}] Retrying fetch`);
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/courses" className="hover:text-gray-800">
              Courses
            </Link>
            <span className="mx-2">&gt;</span>
            <Link
              href={`/courses/${courseId}`}
              className="hover:text-gray-800 truncate"
            >
              {course.title || "Course"}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">Payment Details</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Image and Info */}
            <div className="md:bg-white md:p-6 rounded-lg md:border md:border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CourseImage
                  imageUrl={course.thumbnail_url || course.image || ""}
                  alt={course.title}
                />
                <CourseInfo courseId={courseId} />
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <PromoCode />
            </div>

            <div className="md:hidden">
              <PaymentSummary />
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="md:text-lg font-semibold text-gray-800 mb-4">
                Description
              </h3>
              <p className="max-md:text-sm text-gray-600">
                {course.description || "No description available"}
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <CourseBenefits />
            </div>

            {/* Notes */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <CourseNotes />
            </div>
          </div>

          {/* Right Sidebar - Payment Summary */}
          <div className="lg:col-span-1 max-md:hidden">
            <div className="sticky top-6">
              <PaymentSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
