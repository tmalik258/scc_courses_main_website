import { FilesList } from "./files-list";
import { LearningProgress } from "./learning-progress";
import { LessonList } from "../../../_components/lesson-list";
import { SidebarTabs } from "./sidebar-tabs";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface CourseSidebarProps {
  isPaid: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  sections: Section[];
  expandedSections: number[];
  currentLesson: string;
  onToggleSection: (sectionId: number) => void;
  onLessonClick: (lessonId: string, isLocked: boolean) => void;
  handleJoinCourse: () => void;
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
}: CourseSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <SidebarTabs activeTab={activeTab} onTabChange={onTabChange} />

        {activeTab === "lessons" ? (
          <>
            <LessonList
              isPaid={isPaid}
              sections={sections}
              expandedSections={expandedSections}
              currentLesson={currentLesson}
              onToggleSection={onToggleSection}
              onLessonClick={onLessonClick}
            />
          </>
        ) : (
          <>
            <FilesList />
          </>
        )}
        <LearningProgress handleJoinCourse={handleJoinCourse} isPaid={isPaid} />
      </div>
    </div>
  );
}
