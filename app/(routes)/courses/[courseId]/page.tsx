"use client";

import React, { use, useState } from "react";
import {
  Users,
  Star,
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
import CourseBreadcrumb from "./_components/course-breadcrumb";
import { CourseTabs } from "./_components/course-tabs";
import { useRouter } from "nextjs-toploader/app";
import { LessonList } from "./_components/lesson-list";
import TestimonialCard from "../../_components/testimonial-card";

const CourseDetail = ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(true);
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const router = useRouter();
  const { courseId } = use(params); // courseId extracted here

  // Learning and feature data
  const learningPoints = [
    "Understand the fundamentals of automation and APIs",
    "Work with HTTP requests, JSON data, and third-party APIs",
  ];

  const courseFeatures = [
    { icon: Play, label: "32 Videos" },
    { icon: Download, label: "40 Downloadable Materials" },
    { icon: Clock, label: "20 Hours Duration" },
    { icon: FileText, label: "8 Articles" },
    { icon: FolderOpen, label: "20 Projects" },
    { icon: TestTube, label: "10 Practice Test" },
  ];

  // Dummy content sections
  const courseSections = [
    {
      id: 1,
      title: "Introduction to Automation",
      lessons: [
        {
          id: "what-is-automation",
          title: "What is Automation and Why It Matters",
          completed: false,
          locked: false,
          duration: "10:03",
        },
        {
          id: "real-world-cases",
          title: "Real-World Use Cases of Automation",
          completed: false,
          locked: false,
          duration: "12:03",
        },
        {
          id: "intro-apis",
          title: "Introduction to APIs and How They Work",
          completed: false,
          locked: true,
          duration: "20:03",
        },
      ],
    },
    // Add more sections if needed
  ];

  const instructors = [
    {
      name: "Amit Sharma",
      title: "Software Engineer & Automation Expert",
      image: "/images/instructor_placeholder_2.jpg",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Rahul M.",
      title: "AI Developer at Tech Solutions",
      rating: 5,
      review:
        "The AI Call Bot course was a game-changer! The lessons were easy to follow, and now I've built my own AI-powered customer service system. Highly recommended!",
      avatar:
        "/images/landing_page/testimonial_placeholder.jpg?height=60&width=60",
    },
  ];

  const handleGetStarted = () => {
    router.push(`/courses/${courseId}/lessons/1`);
  };

  const handleLessonClick = (lessonId: string) => {
    router.push(`/courses/${courseId}/lessons/${lessonId}`);
  };

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [sectionId]
    );
  };

  const currentLesson = "what-is-automation";

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Pass courseId to breadcrumb */}
      <CourseBreadcrumb courseId={courseId} />

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main */}
          <div className="lg:col-span-2 max-md:order-2">
            {/* Category */}
            <div className="mb-4">
              <span className="bg-sky-tint text-sky-base text-sm px-3 py-1 rounded font-medium">
                Data Science
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Machine Learning with Python: From Basics to Deployment
            </h1>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-6 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4 text-orange-500" />
                <span>320+ students</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.8/5</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8">
              Learn to streamline workflows by integrating Python and APIs for
              automation, reducing manual tasks, improving efficiency, and
              enhancing productivity with real-world projects.
            </p>

            {/* Tabs */}
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
                          In today&apos;s fast-paced digital world, automation
                          is key to boosting productivity and efficiency...
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
                  {reviews.map((review) => (
                    <TestimonialCard key={review.id} testimonial={review} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-1 max-md:order-1">
            <div className="flex md:flex-col gap-3 md:gap-6 relative">
              <div>
                <Image
                  width={350}
                  height={200}
                  src="/images/course_placeholder.jpg?height=200&width=350"
                  alt="Machine Learning with Python"
                  className="w-32 md:w-full h-full md:h-48 object-cover rounded-lg"
                />
              </div>

              <div className="max-md:flex max-md:flex-col max-md:justify-between text-right">
                <div className="flex items-center max-md:flex-wrap max-md:justify-start justify-end gap-3 mb-4">
                  <span className="text-gray-400 line-through md:text-lg">
                    ₹1,350
                  </span>
                  <span className="text-aqua-mist font-bold text-lg md:text-2xl">
                    ₹1,336
                  </span>
                  <span className="bg-red-100 min-w-fit text-red-600 text-xs md:text-sm px-2 py-1 rounded font-medium">
                    10% OFF
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
