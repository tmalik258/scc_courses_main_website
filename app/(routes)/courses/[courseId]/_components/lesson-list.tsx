"use client";

import { SectionData } from "@/types/lesson";

interface LessonListProps {
  isPaid: boolean;
  sections: SectionData[];
  expandedSections: string[];
  currentLesson: string;
  onToggleSection: (sectionId: string) => void;
  onLessonClick: (lessonId: string, isLocked: boolean) => void;
}

export function LessonList({
  isPaid,
  sections,
  expandedSections,
  currentLesson,
  onToggleSection,
  onLessonClick,
}: LessonListProps) {
  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.id} className="border rounded-lg">
          <button
            onClick={() => onToggleSection(section.id)}
            className="w-full px-4 py-2 text-left font-medium text-gray-800 hover:bg-gray-50"
          >
            {section.title}
          </button>
          {expandedSections.includes(section.id) && (
            <div className="p-4 space-y-2">
              {section.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson.id, lesson.locked)}
                  className={`w-full text-left px-2 py-1 rounded-md ${
                    lesson.id === currentLesson
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${
                    lesson.locked && !isPaid
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={lesson.locked && !isPaid}
                >
                  <div className="flex justify-between">
                    <span>{lesson.title}</span>
                    <span className="text-sm text-gray-500">
                      {lesson.duration}
                    </span>
                  </div>
                  {lesson.completed && (
                    <span className="text-green-500 text-sm">Completed</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
