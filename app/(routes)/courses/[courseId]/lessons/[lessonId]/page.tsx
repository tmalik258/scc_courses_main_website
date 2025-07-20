"use client";

import { use, useEffect, useState } from "react";
import { PaywallContent } from "./_components/paywall-content";
import { LessonVideo } from "./_components/lesson-video";
import { LessonNavigation } from "./_components/lesson-navigation";
import { LessonContent } from "./_components/lesson-content";
import { CourseSidebar } from "./_components/course-sidebar";
import { useRouter } from "nextjs-toploader/app";

// Course sections data
const courseSections = [
  {
    id: 1,
    title: "Introduction to Automation",
    lessons: [
      {
        id: "what-is-automation",
        title: "What is Automation and Why It Matters",
        completed: true,
        locked: false,
      },
      {
        id: "real-world-cases",
        title: "Real-World Use Cases of Automation",
        completed: true,
        locked: false,
      },
      {
        id: "intro-apis",
        title: "Introduction to APIs and How They Work",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: 2,
    title: "Working with APIs in Python",
    lessons: [
      {
        id: "python-requests",
        title: "Making HTTP Requests with Python",
        completed: false,
        locked: true,
      },
      {
        id: "handling-json",
        title: "Handling JSON Data and Responses",
        completed: false,
        locked: true,
      },
      {
        id: "api-authentication",
        title: "API Authentication Methods",
        completed: false,
        locked: true,
      },
      {
        id: "error-handling",
        title: "Error Handling and Best Practices",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: 3,
    title: "Automating Tasks with Python",
    lessons: [
      {
        id: "file-automation",
        title: "Automating File Operations",
        completed: false,
        locked: true,
      },
      {
        id: "email-automation",
        title: "Email Automation with Python",
        completed: false,
        locked: true,
      },
      {
        id: "web-scraping",
        title: "Web Scraping and Data Collection",
        completed: false,
        locked: true,
      },
      {
        id: "scheduling-tasks",
        title: "Scheduling Automated Tasks",
        completed: false,
        locked: true,
      },
    ],
  },
  {
    id: 4,
    title: "Building Real-World Automation Projects",
    lessons: [
      {
        id: "project-planning",
        title: "Planning Your Automation Project",
        completed: false,
        locked: true,
      },
      {
        id: "social-media-bot",
        title: "Building a Social Media Bot",
        completed: false,
        locked: true,
      },
      {
        id: "data-pipeline",
        title: "Creating an Automated Data Pipeline",
        completed: false,
        locked: true,
      },
      {
        id: "deployment",
        title: "Deploying Your Automation Scripts",
        completed: false,
        locked: true,
      },
    ],
  },
];

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const router = useRouter();
  // To test free course behavior, change isPaid to false
  const [isPaid, setIsPaid] = useState(false); // Set to true for paid course, false for free
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [sidebarActiveTab, setSidebarActiveTab] = useState("lessons");
  const [isPaidLesson, setIsPaidLesson] = useState(false);
  const [currentLesson, setCurrentLesson] = useState("what-is-automation");

  console.log("Current Lesson ID:", lessonId);

  useEffect(() => {
    setIsPaid(false);
  }, []);

  // Get all lessons in order
  const getAllLessons = () => {
    return courseSections.flatMap((section) => section.lessons);
  };

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => {
      if (prev.includes(sectionId)) {
        return prev.filter((id) => id !== sectionId);
      }
      return [sectionId];
    });
  };

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (isLocked && !isPaid) {
      setIsPaidLesson(true);
    } else {
      setIsPaidLesson(false);
      setCurrentLesson(lessonId);
    }
  };

  const getCurrentLessonTitle = () => {
    for (const section of courseSections) {
      const lesson = section.lessons.find((l) => l.id === currentLesson);
      if (lesson) return lesson.title;
    }
    return "What is Automation and Why It Matters";
  };

  const navigateToLesson = (direction: "next" | "previous") => {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson
    );

    if (direction === "next" && currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      handleLessonClick(nextLesson.id, nextLesson.locked);

      // Auto-expand the section containing the next lesson
      for (const section of courseSections) {
        if (section.lessons.some((lesson) => lesson.id === nextLesson.id)) {
          setExpandedSections([section.id]);
          break;
        }
      }
    } else if (direction === "previous" && currentIndex > 0) {
      const previousLesson = allLessons[currentIndex - 1];
      handleLessonClick(previousLesson.id, previousLesson.locked);

      // Auto-expand the section containing the previous lesson
      for (const section of courseSections) {
        if (section.lessons.some((lesson) => lesson.id === previousLesson.id)) {
          setExpandedSections([section.id]);
          break;
        }
      }
    }
  };

  const getNavigationState = () => {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson
    );

    return {
      hasPrevious: currentIndex > 0,
      hasNext: currentIndex < allLessons.length - 1,
    };
  };

  const handleJoinCourse = () => {
    // Navigate to the payment page or handle subscription logic
    router.push(`/courses/${courseId}/payment`);
  }

  const { hasPrevious, hasNext } = getNavigationState();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800">
              Courses
            </a>
            <span className="mx-2">&gt;</span>
            <a href="#" className="hover:text-gray-800 truncate">
              Machine Learning with Python: From Basics to Deployment
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">Course Lessons</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-2 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content - 3/4 width */}
          <div className="lg:col-span-3">
            {isPaidLesson && !isPaid ? (
              <div className="order-1">
                <PaywallContent
                  courseId={courseId}
                  lessonTitle={getCurrentLessonTitle()}
                  onPrevious={() => navigateToLesson("previous")}
                  onNext={() => navigateToLesson("next")}
                />
                <div className="md:hidden">
                  <CourseSidebar
                    isPaid={isPaid}
                    activeTab={sidebarActiveTab}
                    onTabChange={setSidebarActiveTab}
                    sections={courseSections}
                    expandedSections={expandedSections}
                    currentLesson={currentLesson}
                    onToggleSection={toggleSection}
                    onLessonClick={handleLessonClick}
                    handleJoinCourse={handleJoinCourse}
                  />
                </div>
              </div>
            ) : (
              <>
                <LessonVideo />
                <LessonNavigation
                  lessonTitle={getCurrentLessonTitle()}
                  onPrevious={() => navigateToLesson("previous")}
                  onNext={() => navigateToLesson("next")}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                />
                <div className="md:hidden">
                  <CourseSidebar
                    isPaid={isPaid}
                    activeTab={sidebarActiveTab}
                    onTabChange={setSidebarActiveTab}
                    sections={courseSections}
                    expandedSections={expandedSections}
                    currentLesson={currentLesson}
                    onToggleSection={toggleSection}
                    onLessonClick={handleLessonClick}
                    handleJoinCourse={handleJoinCourse}
                  />
                </div>
                <LessonContent />
              </>
            )}
          </div>

          {/* Right Sidebar - 1/4 width */}
          <div className="max-md:hidden">
            <CourseSidebar
              isPaid={isPaid}
              activeTab={sidebarActiveTab}
              onTabChange={setSidebarActiveTab}
              sections={courseSections}
              expandedSections={expandedSections}
              currentLesson={currentLesson}
              onToggleSection={toggleSection}
              onLessonClick={handleLessonClick}
              handleJoinCourse={handleJoinCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
