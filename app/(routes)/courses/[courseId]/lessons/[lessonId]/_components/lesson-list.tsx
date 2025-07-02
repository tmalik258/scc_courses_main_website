"use client"

import { ChevronDown, ChevronRight, Lock } from "lucide-react"

interface Lesson {
  id: string
  title: string
  completed: boolean
  locked: boolean
}

interface Section {
  id: number
  title: string
  lessons: Lesson[]
}

interface LessonListProps {
  sections: Section[]
  expandedSections: number[]
  currentLesson: string
  onToggleSection: (sectionId: number) => void
  onLessonClick: (lessonId: string, isLocked: boolean) => void
}

export function LessonList({
  sections,
  expandedSections,
  currentLesson,
  onToggleSection,
  onLessonClick,
}: LessonListProps) {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => onToggleSection(section.id)}
            className="flex items-center justify-between w-full text-left p-2 hover:bg-gray-50 rounded"
          >
            <span className="font-medium text-gray-800">
              {section.id} {section.title}
            </span>
            {expandedSections.includes(section.id) ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {expandedSections.includes(section.id) && (
            <div className="ml-6 mt-2 space-y-2">
              {section.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onLessonClick(lesson.id, lesson.locked)}
                  className={`flex items-center space-x-3 p-2 rounded-lg w-full text-left transition-colors ${
                    currentLesson === lesson.id && !lesson.locked ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      lesson.completed
                        ? "bg-blue-500"
                        : lesson.locked
                          ? "bg-gray-300"
                          : currentLesson === lesson.id
                            ? "bg-blue-500"
                            : "bg-blue-500"
                    }`}
                  ></div>
                  <div className="flex items-center flex-1">
                    <span
                      className={`text-sm ${
                        lesson.locked
                          ? "text-gray-500"
                          : currentLesson === lesson.id
                            ? "text-blue-600 font-medium"
                            : "text-blue-600"
                      }`}
                    >
                      {lesson.title}
                    </span>
                    {lesson.locked && <Lock className="w-3 h-3 ml-2 text-gray-400" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
