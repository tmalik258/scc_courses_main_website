"use client";

import React, { useState, useEffect } from "react";
import {
  Check,
  Play,
  Download,
  Clock,
  FileText,
  FolderOpen,
  TestTube,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CourseInfo } from "./payment/_components/course-info";
import CourseBreadcrumb from "./_components/course-breadcrumb";
import { CourseTabs } from "./_components/course-tabs";
import { useRouter } from "nextjs-toploader/app";
import { LessonList } from "./_components/lesson-list";
import TestimonialCard from "../../_components/testimonial-card";
import { getCourseById } from "@/actions/courses";
import { getTestimonials } from "@/actions/testimonials";
import { CourseData } from "@/types/course";
import { TestimonialType } from "@/types/testimonial";
import { createClient } from "@/utils/supabase/client";
import { LumaSpin } from "@/components/luma-spin";
import type { SectionData } from "@/types/lesson";
import { fetchImage } from "@/utils/supabase/fetchImage";
import Decimal from "decimal.js";

type Props = {
  params: Promise<{ courseId: string }>;
  onLoadingComplete?: () => void;
};

const placeholder = "/images/course_placeholder.jpg";
const instructorPlaceholder = "/images/instructor_placeholder_2.jpg";

function isValidHttpUrl(value: string | undefined | null) {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function formatPrice(
  value: number | string | Decimal | null | undefined
): string {
  if (value == null) return "0.00";
  if (typeof value === "number") return value.toFixed(2);
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? "0.00" : parsed.toFixed(2);
  }
  if (value instanceof Decimal) return value.toNumber().toFixed(2);
  return "0.00";
}

export default function CourseDetail({ params, onLoadingComplete }: Props) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<TestimonialType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string>("");
  const router = useRouter();

  const [imgSrc, setImgSrc] = useState<string>(placeholder);
  const [instructorImgSrc, setInstructorImgSrc] = useState<string>(
    instructorPlaceholder
  );
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isInstructorImgLoading, setIsInstructorImgLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resolved = await params;
        if (mounted && resolved?.courseId) setCourseId(resolved.courseId);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, [params]);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!courseId) return;
    async function fetchCourseAndTestimonials() {
      try {
        setLoading(true);
        const [courseData, testimonialsData] = await Promise.all([
          getCourseById(courseId),
          getTestimonials(),
        ]);
        if (courseData) {
          const originalPrice = formatPrice(courseData.price);
          const discountedPrice = parseFloat(originalPrice) * 0.8;
          const normalizedCourse: CourseData = {
            ...courseData,
            price: originalPrice,
            discount: "20% OFF",
            originalPrice: originalPrice,
            discountedPrice: discountedPrice.toFixed(2),
            learningPoints: courseData.learningPoints || [
              "Understand the fundamentals of the course topic",
              "Apply practical skills in real-world scenarios",
            ],
          };
          setCourse(normalizedCourse);
          if (normalizedCourse.modules && normalizedCourse.modules.length > 0) {
            setExpandedSections([normalizedCourse.modules[0].id]);
          }
        } else {
          setError("Course not found");
        }
        setReviews(testimonialsData);
      } catch (err) {
        console.error("fetchCourseAndTestimonials error:", err);
        setError("Failed to load course data");
      } finally {
        setLoading(false);
      }
    }
    fetchCourseAndTestimonials();
  }, [courseId]);

  useEffect(() => {
    (async () => {
      setIsImgLoading(true);
      if (course?.thumbnailUrl) {
        if (course.thumbnailUrl.includes("supabase.co")) {
          const fetchedUrl = await fetchImage(
            course.thumbnailUrl,
            "courses-resources"
          );
          setImgSrc(fetchedUrl ?? placeholder);
        } else {
          setImgSrc(course.thumbnailUrl);
        }
      } else {
        setImgSrc(placeholder);
      }
      setIsImgLoading(false);
    })();
  }, [course?.thumbnailUrl]);

  useEffect(() => {
    setIsInstructorImgLoading(true);
    const candidate = course?.instructor?.avatarUrl;
    const valid =
      typeof candidate === "string" &&
      candidate.trim().length > 0 &&
      (isValidHttpUrl(candidate) || candidate.startsWith("/"));
    setInstructorImgSrc(valid ? candidate! : instructorPlaceholder);
    setIsInstructorImgLoading(false);
  }, [course?.instructor?.avatarUrl]);

  useEffect(() => {
    if (!loading && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [loading, onLoadingComplete]);

  const handleGetStarted = () => {
    if (!courseId) return;
    router.push(`/courses/${courseId}/lessons/1`);
  };

  const handleLessonClick = (lessonId: string) => {
    if (!courseId) return;
    router.push(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const currentLesson = course?.currentLesson?.id || "";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <LumaSpin />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-red-500 text-center py-12 bg-white">
        {error || "Course not found"}
      </div>
    );
  }

  const adaptedModules: SectionData[] = (course.modules || []).map((mod) => ({
    id: mod.id,
    title: mod.title,
    lessons: (mod.lessons || []).map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      content: lesson.content || null,
      video_url: lesson.video_url || null,
      is_free: lesson.is_free || false,
      completed: false,
      locked: false,
      duration: (lesson as { duration?: string }).duration || "",
      resources: (lesson.resources || []).map((res) => ({
        name: res.name,
        url: res.url,
      })),
    })),
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CourseBreadcrumb courseId={courseId} title={course.title || "Course"} />
      <div className="max-w-7xl mx-auto p-4 md:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-md:order-2">
            <CourseInfo courseId={courseId} course={course} />
            <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      Overview
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-4">
                          Description
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {course.description || "No description available"}
                        </p>
                        <div
                          className="text-gray-600 leading-relaxed text-base"
                          dangerouslySetInnerHTML={{
                            __html:
                              course.description || "No description available",
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-4">
                          What You&apos;ll Learn
                        </h4>
                        <ul className="space-y-3">
                          {(course.learningPoints || []).map((point, i) => (
                            <li key={i} className="flex items-start space-x-4">
                              <Check className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 text-base">
                                {point}
                              </span>
                            </li>
                          ))}
                          {(!course.learningPoints ||
                            course.learningPoints.length === 0) && (
                            <p className="text-gray-600 text-base">
                              No learning points available.
                            </p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "lessons" && (
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-black mb-6">
                    Course Lessons
                  </h3>
                  <LessonList
                    isPaid={false}
                    modules={adaptedModules}
                    expandedSections={expandedSections}
                    currentLesson={currentLesson}
                    onToggleSection={toggleSection}
                    onLessonClick={handleLessonClick}
                  />
                </div>
              )}
              {activeTab === "instructors" && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Instructors
                  </h3>
                  <div className="flex items-center space-x-4 p-6 border rounded-lg">
                    <div className="relative w-16 h-16">
                      {isInstructorImgLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-sm animate-pulse">
                          <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded-full animate-spin" />
                        </div>
                      )}
                      <Image
                        width={64}
                        height={64}
                        src={instructorImgSrc}
                        alt={course.mentor || "Instructor"}
                        className={`w-16 h-16 rounded-sm object-cover transition-opacity duration-300 ${
                          isInstructorImgLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onError={() => {
                          setInstructorImgSrc(instructorPlaceholder);
                          setIsInstructorImgLoading(false);
                        }}
                        onLoadingComplete={() =>
                          setIsInstructorImgLoading(false)
                        }
                        unoptimized={instructorImgSrc === instructorPlaceholder}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 text-lg">
                        {course.mentor}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Student Reviews
                  </h3>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <TestimonialCard key={review.id} testimonial={review} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-base">No reviews yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1 max-md:order-1">
            <div className="flex md:flex-col gap-4 md:gap-6 relative">
              <div>
                <div className="relative w-32 md:w-full h-full md:h-48">
                  {isImgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg animate-pulse">
                      <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    width={350}
                    height={200}
                    alt={course.title || "Course image"}
                    className={`w-32 md:w-full h-full md:h-48 object-cover rounded-lg transition-opacity duration-300 ${
                      isImgLoading ? "opacity-0" : "opacity-100"
                    }`}
                    src={imgSrc}
                    onError={() => {
                      setImgSrc(placeholder);
                      setIsImgLoading(false);
                    }}
                    onLoadingComplete={() => setIsImgLoading(false)}
                    priority={true}
                    unoptimized={imgSrc === placeholder}
                  />
                </div>
              </div>
              <div className="max-md:flex max-md:flex-col max-md:justify-between text-right">
                <div className="flex items-center max-md:flex-wrap max-md:justify-start justify-end gap-4 mb-6">
                  {course.discount !== "0% OFF" && (
                    <span className="text-gray-400 line-through md:text-lg">
                      ₹{course.originalPrice}
                    </span>
                  )}
                  <span className="text-aqua-mist font-bold text-lg md:text-2xl">
                    ₹{course.discountedPrice}
                  </span>
                  {course.discount !== "0% OFF" && (
                    <span className="bg-red-100 min-w-fit text-red-600 text-sm md:text-base px-3 py-2 rounded font-medium">
                      {course.discount}
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-4 text-base md:text-lg cursor-pointer"
                    onClick={handleGetStarted}
                  >
                    Get Started
                    <Play className="inline-block max-md:hidden w-5 h-5 ml-3" />
                  </Button>
                  <div className="max-md:absolute -top-1 right-0">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-aqua-mist hover:bg-gray-50 py-4 max-md:border-0 max-md:shadow-none bg-transparent cursor-pointer"
                      onClick={async () => {
                        if (!userId) return;
                        setIsFavorite(!isFavorite);
                        await fetch("/api/toggle-save-course", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ userId, courseId }),
                        });
                      }}
                    >
                      <span className="max-md:hidden text-base">
                        {isFavorite
                          ? "Remove from Favorite"
                          : "Add to Favorite"}
                      </span>
                      <Bookmark
                        className={`w-5 h-5 md:ml-3 ${
                          isFavorite ? "fill-current text-aqua-mist" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                What You&apos;ll Get
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Play, label: `${course.videoCount} Videos` },
                  {
                    icon: Download,
                    label: `${course.downloadableResources} Downloadable Materials`,
                  },
                  { icon: Clock, label: course.duration || "Unknown Duration" },
                  { icon: FileText, label: `${course.articleCount} Articles` },
                  {
                    icon: FolderOpen,
                    label: `${course.projectCount} Projects`,
                  },
                  {
                    icon: TestTube,
                    label: `${course.practiceTestCount} Practice Tests`,
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <feature.icon className="w-6 h-6 text-gray-500" />
                    <span className="text-gray-600 text-base">
                      {feature.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
