"use client";

import { use, useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { PaywallContent } from "./_components/paywall-content";
import { LessonVideo } from "./_components/lesson-video";
import { LessonNavigation } from "./_components/lesson-navigation";
import { LessonContent } from "./_components/lesson-content";
import { CourseSidebar } from "./_components/course-sidebar";
import { useRouter } from "nextjs-toploader/app";
import { getLessonById, getCourseLessons } from "@/actions/get-lessons";
import { SectionData, LessonData } from "../../../../../../types/lesson";

// Validate UUID format
const isValidUUID = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);

  const router = useRouter();
  const supabase = createClient();

  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isPaid, setIsPaid] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [sidebarActiveTab, setSidebarActiveTab] = useState("lessons");
  const [isPaidLesson, setIsPaidLesson] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasRedirectedRef = useRef(false);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user?.id) {
        console.warn("No user authenticated, proceeding without userId");
        setUserId(undefined);
      } else {
        setUserId(user.id);
      }
    }
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        if (!isValidUUID(courseId)) {
          setError("Invalid course ID");
          return;
        }

        const courseSections = await getCourseLessons(courseId, userId);
        if (!courseSections || courseSections.length === 0) {
          setError("No lessons available for this course");
          return;
        }

        let selectedLesson: LessonData | null = null;
        const allLessons = courseSections.flatMap((section) => section.lessons);

        if (lessonId && isValidUUID(lessonId)) {
          selectedLesson = await getLessonById(lessonId, courseId, userId);
        }

        if (!selectedLesson && !hasRedirectedRef.current) {
          const firstLesson = allLessons[0] || null;

          if (firstLesson) {
            hasRedirectedRef.current = true;
            router.replace(`/courses/${courseId}/lessons/${firstLesson.id}`);
            return;
          } else {
            setError("No lessons available for this course");
            return;
          }
        }

        if (!selectedLesson) {
          setError("Lesson not found.");
          return;
        }

        setCurrentLesson(selectedLesson);
        setSections(courseSections);
        setExpandedSections(
          courseSections.length > 0
            ? [
                courseSections.find((s) =>
                  s.lessons.some((l) => l.id === selectedLesson!.id)
                )?.id || courseSections[0].id,
              ]
            : []
        );
        setIsPaid(!selectedLesson.locked);
        setIsPaidLesson(selectedLesson.locked);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load course data");
      } finally {
        setLoading(false);
      }
    }

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
        : [sectionId]
    );
  };

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (isLocked) {
      setIsPaidLesson(true);
    } else {
      setIsPaidLesson(false);
      const lesson = getAllLessons().find((l) => l.id === lessonId);
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
      hasNext: currentIndex < allLessons.length - 1,
    };
  };

  const handleJoinCourse = () => {
    router.push(`/courses/${courseId}/payment`);
  };

  if (loading) {
    return (
      <div className="text-gray-600 text-center py-8">Loading lesson...</div>
    );
  }

  if (error || !currentLesson?.id) {
    return (
      <div className="text-red-600 text-center py-8">
        Error: {error || "Lesson data not found"}
      </div>
    );
  }

  const { hasPrevious, hasNext } = getNavigationState();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-gray-800">
              Courses
            </a>
            <span className="mx-2">&gt;</span>
            <a href="#" className="hover:text-gray-800 truncate">
              {sections.find((s) =>
                s.lessons.some((l) => l.id === currentLesson.id)
              )?.title || "Course"}
            </a>
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
                    resources={currentLesson.resources}
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
                    resources={currentLesson.resources}
                  />
                </div>
                <LessonContent content={currentLesson.content} />
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
              resources={currentLesson.resources}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
