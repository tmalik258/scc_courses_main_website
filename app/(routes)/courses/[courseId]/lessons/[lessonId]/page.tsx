"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { PaywallContent } from "./_components/paywall-content";
import { LessonVideo } from "./_components/lesson-video";
import { LessonNavigation } from "./_components/lesson-navigation";
import { LessonContent } from "./_components/lesson-content";
import { CourseSidebar } from "./_components/course-sidebar";
import { getLessonById, getCourseLessons } from "@/actions/lessons";
import { SectionData, LessonData } from "../../../../../../types/lesson";
import Link from "next/link";
import { LumaSpin } from "@/components/luma-spin";

const isValidUUID = (id: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function LessonPage() {
  const { courseId, lessonId } = useParams() as {
    courseId: string;
    lessonId: string;
  };
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
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
          setError("No lessons found.");
          return;
        }

        const allLessons = courseSections.flatMap((s) => s.lessons);
        let selectedLesson: LessonData | null = null;

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
          setError("No lessons available.");
          return;
        }

        if (!selectedLesson) {
          setError("Lesson not found.");
          return;
        }

        setCurrentLesson(selectedLesson);
        setSections(courseSections);
        setExpandedSections([
          courseSections.find((s) =>
            s.lessons.some((l) => l.id === selectedLesson?.id)
          )?.id || courseSections[0].id,
        ]);

        setIsPaid(!selectedLesson.locked);
        setIsPaidLesson(selectedLesson.locked);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch course data.");
      } finally {
        setLoading(false);
      }
    };

    if (userId !== undefined) {
      fetchData();
    }
  }, [courseId, lessonId, userId, router]);

  const getAllLessons = (): LessonData[] =>
    sections.flatMap((section) => section.lessons);

  const getNavigationState = () => {
    const lessons = getAllLessons();
    const index = lessons.findIndex((l) => l.id === currentLesson?.id);
    return {
      hasPrevious: index > 0,
      hasNext: index < lessons.length - 1,
    };
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    // Only run on direct user clicks — not programmatic state changes
    if (isLocked) {
      setIsPaidLesson(true);
      return;
    }

    setIsPaidLesson(false);

    // Avoid re-pushing if already on the same lesson
    if (currentLesson?.id === lessonId) {
      return;
    }

    const lesson = getAllLessons().find((l) => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      router.push(`/courses/${courseId}/lessons/${lessonId}`);
    }
  };

  const navigateToLesson = async (direction: "next" | "previous") => {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson?.id
    );
    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= allLessons.length) return;

    const nextLesson = allLessons[nextIndex];

    // Prevent navigation if locked
    if (nextLesson.locked) {
      setIsPaidLesson(true);
      return;
    }

    // Update progress if needed
    if (currentLesson && !currentLesson.completed && userId) {
      try {
        await fetch("/api/progress/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, lessonId: currentLesson.id }),
        });

        setSections((prev) =>
          prev.map((section) => ({
            ...section,
            lessons: section.lessons.map((lesson) =>
              lesson.id === currentLesson.id
                ? { ...lesson, completed: true }
                : lesson
            ),
          }))
        );
      } catch (err) {
        console.error("Error updating progress", err);
      }
    }

    // Navigate only after everything else
    setCurrentLesson(nextLesson);
    router.push(`/courses/${courseId}/lessons/${nextLesson.id}`);

    const section = sections.find((s) =>
      s.lessons.some((l) => l.id === nextLesson.id)
    );
    if (section) {
      setExpandedSections([section.id]);
    }
  };

  const handleJoinCourse = () => {
    router.push(`/courses/${courseId}/payment`);
  };

  const totalLessons = getAllLessons().length;
  const completedLessons = getAllLessons().filter((l) => l.completed).length;
  const { hasPrevious, hasNext } = getNavigationState();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <LumaSpin />
      </div>
    );
  }

  if (error || !currentLesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center w-full text-red-600">
        Error: {error ?? "Lesson data not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

      <div className="max-w-7xl mx-auto p-2 md:p-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {isPaidLesson ? (
              <div className="order-1">
                <PaywallContent
                  courseId={courseId}
                  lessonTitle={currentLesson.title}
                  onPrevious={() => navigateToLesson("previous")}
                  onNext={() => navigateToLesson("next")}
                />
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
                  lessonTitle={currentLesson.title}
                  onPrevious={() => navigateToLesson("previous")}
                  onNext={() => navigateToLesson("next")}
                  hasPrevious={hasPrevious}
                  hasNext={hasNext}
                  isPaid={isPaid}
                  isPaidLesson={isPaidLesson}
                />
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

          <div className="space-y-4">
            <CourseSidebar
              isPaid={isPaid}
              activeTab={sidebarActiveTab}
              onTabChange={setSidebarActiveTab}
              modules={sections}
              expandedSections={expandedSections}
              currentLesson={currentLesson.id}
              onToggleSection={toggleSection}
              onLessonClick={handleLessonClick}
              handleJoinCourse={handleJoinCourse}
              courseId={courseId}
              totalLessons={totalLessons}
              completedLessons={completedLessons}
              resources={sections
                .flatMap((section) =>
                  section.lessons.flatMap((lesson) => lesson.resources)
                )
                .map((resource) => ({
                  name: resource.name,
                  signedUrl: resource.url,
                }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
