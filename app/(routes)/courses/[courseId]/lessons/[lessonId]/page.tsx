"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { PaywallContent } from "./_components/paywall-content";
import { LessonVideo } from "./_components/lesson-video";
import { LessonNavigation } from "./_components/lesson-navigation";
import { LessonContent } from "./_components/lesson-content";
import { CourseSidebar } from "./_components/course-sidebar";
import { useRouter } from "next/navigation";
import { getLessonById, getCourseLessons } from "@/actions/get-lessons";
import { SectionData, LessonData } from "../../../../../../types/lesson";
import Link from "next/link";

// Validate UUID format
const isValidUUID = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

interface LessonPageProps {
  params: { courseId: string; lessonId: string };
}

export default function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = params;
  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sidebarActiveTab, setSidebarActiveTab] = useState<string>("lessons");
  const [isPaidLesson, setIsPaidLesson] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error || !user?.id) {
          console.warn("No user authenticated, proceeding without userId");
          setUserId(null);
        } else {
          setUserId(user.id);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUserId(null);
      }
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!isValidUUID(courseId)) {
          setError("Invalid course ID");
          return;
        }

        const courseSections = await getCourseLessons(
          courseId,
          userId || undefined
        );
        if (!courseSections?.length) {
          setError("No lessons available for this course");
          return;
        }

        let selectedLesson: LessonData | null = null;
        const allLessons = courseSections.flatMap((section) => section.lessons);

        if (lessonId && isValidUUID(lessonId)) {
          selectedLesson = await getLessonById(
            lessonId,
            courseId,
            userId || undefined
          );
        }

        if (!selectedLesson && !hasRedirectedRef.current) {
          const firstLesson = allLessons[0];
          if (firstLesson) {
            hasRedirectedRef.current = true;
            router.replace(`/courses/${courseId}/lessons/${firstLesson.id}`);
            return;
          }
          setError("No lessons available for this course");
          return;
        }

        if (!selectedLesson) {
          setError("Lesson not found");
          return;
        }

        setCurrentLesson(selectedLesson);
        setSections(courseSections);
        setExpandedSections(
          courseSections.length > 0
            ? [
                courseSections.find((s) =>
                  s.lessons.some((l) => l.id === selectedLesson.id)
                )?.id || courseSections[0].id,
              ]
            : []
        );
        setIsPaid(!selectedLesson.locked);
        setIsPaidLesson(selectedLesson.locked);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load course data";
        console.error("Error fetching data:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (userId !== undefined) {
      fetchData();
    }
  }, [courseId, lessonId, userId, router]);

  const getAllLessons = (): LessonData[] => {
    return sections.flatMap((section) => section.lessons);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (isLocked) {
      setIsPaidLesson(true);
      return;
    }

    setIsPaidLesson(false);
    const lesson = getAllLessons().find((l) => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      router.push(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };

  const getCurrentLessonTitle = () => {
    return currentLesson?.title ?? "Lesson not found";
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
        s.lessons.some((l) => l.id === nextLesson.id)
      );
      if (section) setExpandedSections([section.id]);
    } else if (direction === "previous" && currentIndex > 0) {
      const previousLesson = allLessons[currentIndex - 1];
      handleLessonClick(previousLesson.id, previousLesson.locked);
      const section = sections.find((s) =>
        s.lessons.some((l) => l.id === previousLesson.id)
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
      hasNext: currentIndex >= 0 && currentIndex < allLessons.length - 1,
    };
  };

  const handleJoinCourse = () => {
    router.push(`/courses/${courseId}/payment`);
  };

  const totalLessons = getAllLessons().length;
  const completedLessons = getAllLessons().filter(
    (lesson) => lesson.completed
  ).length;

  if (loading) {
    return (
      <div className="text-gray-600 text-center py-8">Loading lesson...</div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="text-red-600 text-center py-8">
        Error: {error ?? "Lesson data not found"}
      </div>
    );
  }

  const { hasPrevious, hasNext } = getNavigationState();

  return (
    <div className="min-h-screen bg-white">
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
              {sections.find((s) =>
                s.lessons.some((l) => l.id === currentLesson.id)
              )?.title ?? "Course"}
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">Course Lessons</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {isPaidLesson ? (
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
                    courseId={courseId}
                    totalLessons={totalLessons}
                    completedLessons={completedLessons}
                  />
                </div>
              </div>
            ) : (
              <>
                {currentLesson.video_url ? (
                  <LessonVideo signedUrl={currentLesson.video_url} />
                ) : (
                  <div className="text-gray-600 text-center py-4">
                    No video available for this lesson
                  </div>
                )}
                <LessonNavigation
                  lessonTitle={getCurrentLessonTitle()}
                  onPrevious={() => navigateToLesson("previous")}
                  onNext={() => navigateToLesson("next")}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  isPaid={isPaid}
                  isPaidLesson={isPaidLesson}
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
                    courseId={courseId}
                    totalLessons={totalLessons}
                    completedLessons={completedLessons}
                  />
                </div>
                {currentLesson.content ? (
                  <LessonContent content={currentLesson.content} />
                ) : (
                  <div className="text-gray-600 text-center py-4">
                    No content available for this lesson
                  </div>
                )}
              </>
            )}
          </div>

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
              courseId={courseId}
              totalLessons={totalLessons}
              completedLessons={completedLessons}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
