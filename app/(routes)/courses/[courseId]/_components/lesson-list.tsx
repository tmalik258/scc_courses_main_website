"use client";

import { ChevronDown, ChevronRight, Lock } from "lucide-react";

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

interface LessonListProps {
  isPaid: boolean;
  sections: Section[];
  expandedSections: number[];
  currentLesson: string;
  onToggleSection: (sectionId: number) => void;
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
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id} className="border border-gray-200 rounded">
          <button
            onClick={() => onToggleSection(section.id)}
            className="flex items-center justify-between w-full text-left px-4 p-2 bg-sky-ice hover:bg-sky-tint transition-colors duration-300 cursor-pointer rounded"
          >
            <div className="flex gap-3 max-md:text-sm font-medium text-gray-800">
              <div>{section.id}</div>
              <div>{section.title}</div>
            </div>
            {expandedSections.includes(section.id) ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes(section.id) && (
            <div className="px-3 mt-2 space-y-2">
              {section.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson.id, lesson.locked)}
                  className={`flex items-center space-x-3 p-2 rounded-lg w-full text-left transition-colors ${
                    currentLesson === lesson.id && !lesson.locked
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      lesson.completed
                        ? "bg-aqua-mist"
                        : lesson.locked
                        ? "bg-gray-300"
                        : currentLesson === lesson.id
                        ? "bg-aqua-mist"
                        : "bg-gray-700"
                    }`}
                  ></div>
                  <div className="flex items-center flex-1">
                    <span
                      className={`text-sm ${
                        lesson.locked
                          ? "text-gray-500"
                          : currentLesson === lesson.id
                          ? "text-aqua-depth font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {lesson.title}
                    </span>
                    {lesson.locked && !isPaid && (
                      <Lock className="w-3 h-3 ml-2 text-gray-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
