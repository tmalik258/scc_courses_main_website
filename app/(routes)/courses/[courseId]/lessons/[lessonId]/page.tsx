"use client";

import { use, useEffect, useState } from "react";
import { PaywallContent } from "./_components/paywall-content";
import { LessonVideo } from "./_components/lesson-video";
import { LessonNavigation } from "./_components/lesson-navigation";
import { LessonContent } from "./_components/lesson-content";
import { CourseSidebar } from "./_components/course-sidebar";
import { useRouter } from "nextjs-toploader/app";
import {
  getLessonById,
  getCourseLessons,
  LessonData,
  SectionData,
} from "@/actions/get-lessons";

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sidebarActiveTab, setSidebarActiveTab] = useState("lessons");
  const [isPaidLesson, setIsPaidLesson] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [lessonData, courseSections] = await Promise.all([
          getLessonById(lessonId, courseId),
          getCourseLessons(courseId),
        ]);
        if (!lessonData || !courseSections) {
          setError("Lesson or course data not found");
        } else {
          setCurrentLesson(lessonData);
          setSections(courseSections);
          setExpandedSections(
            courseSections.length > 0 ? [courseSections[0].id] : []
          );
          setIsPaid(lessonData.is_free);
          setIsPaidLesson(!lessonData.is_free && !lessonData.completed);
        }
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId, lessonId]);

  const getAllLessons = (): LessonData[] => {
    return sections.flatMap((section) => section.lessons);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [sectionId]
    );
  };

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (isLocked && !isPaid) {
      setIsPaidLesson(true);
    } else {
      setIsPaidLesson(false);
      const lesson = getAllLessons().find((l: LessonData) => l.id === lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        router.push(`/courses/${courseId}/lessons/${lessonId}`);
      }
    }
  };

  const getCurrentLessonTitle = () => {
    return currentLesson?.title || "Lesson not found";
  };

  const navigateToLesson = (direction: "next" | "previous") => {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson?.id
    );

    if (direction === "next" && currentIndex < allLessons.length - 1) {
      const nextLesson = allLessons[currentIndex + 1];
      handleLessonClick(nextLesson.id, nextLesson.locked);
      const section = sections.find((s) =>
        s.lessons.some((l: LessonData) => l.id === nextLesson.id)
      );
      if (section) setExpandedSections([section.id]);
    } else if (direction === "previous" && currentIndex > 0) {
      const previousLesson = allLessons[currentIndex - 1];
      handleLessonClick(previousLesson.id, previousLesson.locked);
      const section = sections.find((s) =>
        s.lessons.some((l: LessonData) => l.id === previousLesson.id)
      );
      if (section) setExpandedSections([section.id]);
    }
  };

  const getNavigationState = () => {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson?.id
    );

    return {
      hasPrevious: currentIndex > 0,
      hasNext: currentIndex < allLessons.length - 1,
    };
  };

  const handleJoinCourse = () => {
    router.push(`/courses/${courseId}/payment`);
  };

  if (loading) {
    return <div className="text-gray-500 text-center py-12">Loading...</div>;
  }

  if (error || !currentLesson || !sections) {
    return (
      <div className="text-red-500 text-center py-12">
        {error || "Data not found"}
      </div>
    );
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
              {sections.find((s) =>
                s.lessons.some((l: LessonData) => l.id === currentLesson.id)
              )?.title || "Course"}
            </a>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">Course Lessons</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-2 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content */}
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
                    sections={sections}
                    expandedSections={expandedSections}
                    currentLesson={currentLesson.id}
                    onToggleSection={toggleSection}
                    onLessonClick={handleLessonClick}
                    handleJoinCourse={handleJoinCourse}
                  />
                </div>
              </div>
            ) : (
              <>
                <LessonVideo video_url={currentLesson.video_url} />
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
                    sections={sections}
                    expandedSections={expandedSections}
                    currentLesson={currentLesson.id}
                    onToggleSection={toggleSection}
                    onLessonClick={handleLessonClick}
                    handleJoinCourse={handleJoinCourse}
                  />
                </div>
                <LessonContent content={currentLesson.content} />
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="max-md:hidden">
            <CourseSidebar
              isPaid={isPaid}
              activeTab={sidebarActiveTab}
              onTabChange={setSidebarActiveTab}
              sections={sections}
              expandedSections={expandedSections}
              currentLesson={currentLesson.id}
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
