"use client";

import { FilesList } from "./files-list";
import { LearningProgress } from "./learning-progress";
import { LessonList } from "../../../_components/lesson-list";
import { SidebarTabs } from "./sidebar-tabs";
import { SectionData } from "../../../../../../../types/lesson";

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
  resources?: { id: string; name: string; url: string }[];
}

export function CourseSidebar({
  isPaid,
  activeTab,
  onTabChange,
  sections,
  expandedSections,
  currentLesson,
  onToggleSection,
  onLessonClick,
  handleJoinCourse,
  resources = [], // Default to empty array to avoid undefined
}: CourseSidebarProps) {
  const hasResources = resources.length > 0;

  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <SidebarTabs
          activeTab={activeTab}
          onTabChange={onTabChange}
          hasResources={hasResources}
        />
        {activeTab === "lessons" ? (
          <LessonList
            isPaid={isPaid}
            sections={sections}
            expandedSections={expandedSections}
            currentLesson={currentLesson}
            onToggleSection={onToggleSection}
            onLessonClick={onLessonClick}
          />
        ) : (
          <FilesList resources={resources} />
        )}
        <LearningProgress handleJoinCourse={handleJoinCourse} isPaid={isPaid} />
      </div>
    </div>
  );
}
