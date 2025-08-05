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
import { getCourseById } from "@/actions/get-courses";
import { getTestimonials } from "@/actions/get-testimonials";
import { CourseData } from "@/types/course";
import { TestimonialType } from "@/types/testimonial";
import { createClient } from "@/utils/supabase/client";
import { LumaSpin } from "@/components/luma-spin";
import { DashedSpinner } from "@/components/dashed-spinner";
import { fetchImage } from "@/utils/supabase/fetchImage";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const router = useRouter();
  const { courseId } = React.use(params);

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
          if (courseData.sections.length > 0) {
            setExpandedSections([courseData.sections[0].id]);
          }
        } else {
          setError("Course not found");
        }

        setReviews(testimonialsData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load course data");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseAndTestimonials();
  }, [courseId]);

  useEffect(() => {
    const loadImage = async () => {
      console.log(`[CourseDetail ${courseId}] Loading image:`, {
        thumbnail_url: course?.thumbnail_url,
        image: course?.image,
        isEmpty: !course?.thumbnail_url && !course?.image,
      });
      setImageLoading(true);
      try {
        const imageSource = course?.thumbnail_url || course?.image;
        if (imageSource && imageSource.trim() !== "") {
          const url = await fetchImage(imageSource);
          if (!url || typeof url !== "string") {
            throw new Error("fetchImage returned invalid or no URL");
          }
          console.log(
            `[CourseDetail ${courseId}] Image fetched successfully:`,
            url
          );
          setImageUrl(url);
        } else {
          console.warn(
            `[CourseDetail ${courseId}] No valid image provided, using placeholder`
          );
          setImageUrl("/images/course_placeholder.jpg");
        }
      } catch (err) {
        console.error(`[CourseDetail ${courseId}] Error fetching image:`, err);
        setImageUrl("/images/course_placeholder.jpg");
      } finally {
        setImageLoading(false);
      }
    };

    if (course) {
      loadImage();
    }
  }, [course, courseId]);

  useEffect(() => {
    if (!loading && onLoadingComplete) {
      onLoadingComplete();
    }
  }, [loading, onLoadingComplete]);

  const handleGetStarted = () => {
    console.log(
      `[CourseDetail ${courseId}] Navigating to: /courses/${courseId}/lessons/1`
    );
    router.push(`/courses/${courseId}/lessons/1`);
  };

  const handleLessonClick = (lessonId: string) => {
    console.log(
      `[CourseDetail ${courseId}] Navigating to lesson: /courses/${courseId}/lessons/${lessonId}`
    );
    router.push(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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
                        <h4 className="font-medium text-gray-800 mb-3">
                          What You&apos;ll Learn
                        </h4>
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
                    sections={course.sections}
                    expandedSections={expandedSections}
                    currentLesson={course.sections[0]?.lessons[0]?.id || ""}
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
                      <p className="text-gray-600 text-sm">
                        {course.instructor?.bio ||
                          "Software Engineer & Automation Expert"}
                      </p>
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
                {imageLoading ? (
                  <div className="w-32 md:w-full h-40 md:h-48 flex items-center justify-center">
                    <DashedSpinner size={24} />
                  </div>
                ) : (
                  <Image
                    width={256}
                    height={192}
                    src={imageUrl || "/images/course_placeholder.jpg"}
                    alt={course.title}
                    className="w-32 md:w-full h-40 md:h-48 object-cover rounded-lg"
                    onError={(e) => {
                      console.error(
                        `[CourseDetail ${courseId}] Image failed to load:`,
                        imageUrl
                      );
                      setImageUrl("/images/course_placeholder.jpg");
                      e.currentTarget.src = "/images/course_placeholder.jpg";
                    }}
                  />
                )}
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
