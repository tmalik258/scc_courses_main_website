"use client";

import { LearningProgress } from "./learning-progress";

interface CourseSidebarProps {
  isPaid: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  sections: SectionData[];
  expandedSections: string[];
  currentLesson: string;
  onToggleSection: (sectionId: string) => void;
  onLessonClick: (lessonId: string, isLocked: boolean) => void;
  handleJoinCourse: () => void;
  courseId: string;
  totalLessons: number;
  completedLessons: number;
}

interface SectionData {
  id: string;
  title: string;
  lessons: { id: string; title: string; locked: boolean }[];
}

export function CourseSidebar({
  isPaid,
  // activeTab,
  // onTabChange,
  // sections,
  // expandedSections,
  // currentLesson,
  // onToggleSection,
  // onLessonClick,
  handleJoinCourse,
  totalLessons,
  completedLessons,
}: CourseSidebarProps) {
  return (
    <div className="lg:col-span-1 bg-gray-50 p-4 rounded">
      {/* Add your existing sidebar content here, e.g., tabs, lesson lists */}
      <LearningProgress
        isPaid={isPaid}
        handleJoinCourse={handleJoinCourse}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
      />
    </div>
  );
}
