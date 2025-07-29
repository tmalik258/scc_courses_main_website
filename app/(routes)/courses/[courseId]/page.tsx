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
import { getCourseById } from "@/actions/get-courses";
import { getTestimonials } from "@/actions/get-testimonials";
import { CourseData } from "@/types/course";
import { TestimonialType } from "@/types/testimonial";

const CourseDetail = ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(true);
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<TestimonialType[]>([]);
  const router = useRouter();
  const { courseId } = use(params);

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

  const learningPoints = [
    "Understand the fundamentals of automation and APIs",
    "Work with HTTP requests, JSON data, and third-party APIs",
  ];

  const courseFeatures = [
    { icon: Play, label: "32 Videos" },
    { icon: Download, label: "40 Downloadable Materials" },
    { icon: Clock, label: course?.duration || "20 Hours Duration" },
    { icon: FileText, label: "8 Articles" },
    { icon: FolderOpen, label: "20 Projects" },
    { icon: TestTube, label: "10 Practice Test" },
  ];

  const courseSections = [
    {
      id: "1",
      title: "Introduction to Automation",
      lessons: [
        {
          id: "what-is-automation",
          title: "What is Automation and Why It Matters",
          completed: false,
          locked: false,
          duration: "10:03",
          content: "Introduction to automation concepts.",
          video_url: "https://example.com/video1.mp4",
          is_free: true,
          resources: [],
        },
        {
          id: "real-world-cases",
          title: "Real-World Use Cases of Automation",
          completed: false,
          locked: false,
          duration: "12:03",
          content: "Explore practical automation use cases.",
          video_url: "https://example.com/video2.mp4",
          is_free: true,
          resources: [],
        },
        {
          id: "intro-apis",
          title: "Introduction to APIs and How They Work",
          completed: false,
          locked: true,
          duration: "20:03",
          content: "Deep dive into APIs.",
          video_url: "https://example.com/video3.mp4",
          is_free: false,
          resources: [],
        },
      ],
    },
  ];

  const instructors = [
    {
      name: course?.mentor || "Amit Sharma",
      title: "Software Engineer & Automation Expert",
      image: "/images/instructor_placeholder_2.jpg",
    },
  ];

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
        : [sectionId]
    );
  };

  const currentLesson = "what-is-automation";

  if (loading) {
    return (
      <div className="text-gray-500 text-center py-12">Loading course...</div>
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
    <div className="min-h-screen bg-white">
      <CourseBreadcrumb courseId={courseId} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                          {learningPoints.map((point, i) => (
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
                    sections={courseSections}
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
                  {instructors.map((instructor) => (
                    <div
                      key={instructor.name}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <Image
                        width={64}
                        height={64}
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-16 h-16 rounded-sm object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {instructor.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {instructor.title}
                        </p>
                      </div>
                    </div>
                  ))}
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

          <div className="lg:col-span-1 max-md:order-1">
            <div className="flex md:flex-col gap-3 md:gap-6 relative">
              <div>
                <Image
                  width={350}
                  height={200}
                  src={course.image}
                  alt={course.title}
                  className="w-32 md:w-full h-full md:h-48 object-cover rounded-lg"
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
                      onClick={() => setIsFavorite(!isFavorite)}
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
                {courseFeatures.map((feature, index) => (
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
