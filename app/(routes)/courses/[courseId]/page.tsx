"use client";

import React, { useState, useEffect, use } from "react";
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

// Import types from lesson.ts for the mapping
import type { SectionData } from "@/types/lesson";

const CourseDetail = ({
  params,
  onLoadingComplete,
}: {
  params: Promise<{ courseId: string }>;
  onLoadingComplete?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<TestimonialType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { courseId } = use(params);

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
    async function fetchCourseAndTestimonials() {
      try {
        setLoading(true);
        const [courseData, testimonialsData] = await Promise.all([
          getCourseById(courseId),
          getTestimonials(),
        ]);

        if (courseData) {
          setCourse(courseData);
          // Set the first section as expanded by default if sections exist
          if (courseData.modules.length > 0) {
            setExpandedSections([courseData.modules[0].id]);
          }
        } else {
          setError("Course not found");
        }

        setReviews(testimonialsData);
      } catch {
        setError("Failed to load course data");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseAndTestimonials();
  }, [courseId]);

  useEffect(() => {
    if (!loading && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [loading, onLoadingComplete]);

  const handleGetStarted = () => {
    router.push(`/courses/${courseId}/lessons/1`);
  };

  const handleLessonClick = (lessonId: string) => {
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
      <div className="flex items-center justify-center h-screen w-full">
        <LumaSpin />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-red-500 text-center py-12">
        {error || "Course not found"}
      </div>
    );
  }

  const adaptedModules: SectionData[] = course.modules.map((mod) => ({
    id: mod.id,
    title: mod.title,
    lessons: mod.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      content: lesson.content || null,
      video_url: lesson.video_url || null,
      is_free: lesson.is_free || false,
      completed: false,
      locked: false,
      duration: (lesson as { duration?: string }).duration || "",
      resources: lesson.resources.map((res) => ({
        name: res.name,
        url: res.url,
      })),
    })),
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CourseBreadcrumb courseId={courseId} />

      <div className="max-w-7xl mx-auto p-4 md:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 max-md:order-2">
            <CourseInfo courseId={courseId} />
            <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div>
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Overview
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">
                          Description
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {course.description || "No description available"}
                        </p>
                      </div>
                      <div>
                        <ul className="space-y-2">
                          {course.learningPoints.map((point, i) => (
                            <li key={i} className="flex items-start space-x-3">
                              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "lessons" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Course Lessons
                  </h3>
                  <LessonList
                    isPaid={false}
                    modules={adaptedModules} // <-- use adapted modules here
                    expandedSections={expandedSections}
                    currentLesson={currentLesson}
                    onToggleSection={toggleSection}
                    onLessonClick={handleLessonClick}
                  />
                </div>
              )}

              {activeTab === "instructors" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Instructors
                  </h3>
                  <div className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Image
                      width={64}
                      height={64}
                      src={
                        course.instructor?.avatarUrl ||
                        "/images/instructor_placeholder_2.jpg"
                      }
                      alt={course.mentor}
                      className="w-16 h-16 rounded-sm object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {course.mentor}
                      </h4>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Student Reviews
                  </h3>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <TestimonialCard key={review.id} testimonial={review} />
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1 max-md:order-1">
            <div className="flex md:flex-col gap-3 md:gap-6 relative">
              <div>
                <Image
                  width={350}
                  height={200}
                  alt={course.title}
                  className="w-32 md:w-full h-full md:h-48 object-cover rounded-lg"
                  src={""}
                />
              </div>

              <div className="max-md:flex max-md:flex-col max-md:justify-between text-right">
                <div className="flex items-center max-md:flex-wrap max-md:justify-start justify-end gap-3 mb-4">
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

                <div className="space-y-3">
                  <Button
                    className="w-full bg-aqua-mist hover:bg-aqua-depth text-white py-3 text-sm md:text-lg cursor-pointer"
                    onClick={handleGetStarted}
                  >
                    Get Started
                    <Play className="inline-block max-md:hidden w-4 h-4 ml-2" />
                  </Button>

                  <div className="max-md:absolute -top-1 right-0">
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-aqua-mist hover:bg-gray-50 py-3 max-md:border-0 max-md:shadow-none bg-transparent cursor-pointer"
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
                      <span className="max-md:hidden">
                        {isFavorite
                          ? "Remove from Favorite"
                          : "Add to Favorite"}
                      </span>
                      <Bookmark
                        className={`w-4 h-4 md:ml-2 ${
                          isFavorite ? "fill-current text-aqua-mist" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                What You&apos;ll Get
              </h3>
              <div className="space-y-3">
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
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
