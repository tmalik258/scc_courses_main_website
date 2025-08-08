"use client";

import { ChevronDown, ChevronRight, Check, Lock } from "lucide-react";
import { SectionData } from "@/types/lesson";

interface CourseSidebarProps {
  isPaid: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  modules: SectionData[];
  expandedSections: string[];
  currentLesson: string;
  onToggleSection: (sectionId: string) => void;
  onLessonClick: (lessonId: string, isLocked: boolean) => void;
  handleJoinCourse: () => void;
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  resources?: { name: string; signedUrl: string }[];
}

export function CourseSidebar({
  isPaid,
  activeTab,
  onTabChange,
  modules,
  expandedSections,
  onToggleSection,
  onLessonClick,
  handleJoinCourse,
  totalLessons,
  completedLessons,
  resources = [],
}: CourseSidebarProps) {
  const isSectionLocked = (index: number): boolean => {
    if (index === 0 || isPaid) return false;
    const prevSection = modules[index - 1];
    return prevSection.lessons.some((lesson) => !lesson.completed);
  };

  const isLessonActuallyLocked = (
    sectionIndex: number,
    lesson: { locked: boolean }
  ): boolean => {
    return isSectionLocked(sectionIndex) || (lesson.locked && !isPaid);
  };

  const progressPercent =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="mx-auto p-0 w-[380px]">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex">
          <button
            onClick={() => onTabChange("lessons")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "lessons"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Course Lessons
          </button>
          <button
            onClick={() => onTabChange("files")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "files"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            File
          </button>
        </div>
      </div>

      {/* Lessons View */}
      {activeTab === "lessons" && (
        <div className="space-y-6">
          {modules.map((section, index) => {
            const sectionLocked = isSectionLocked(index);
            const isExpanded = expandedSections.includes(section.id);

            return (
              <div
                key={section.id}
                className="rounded-lg bg-[#F7FBFF] border border-gray-100 shadow-sm"
              >
                {/* Section Header */}
                <button
                  onClick={() => {
                    if (!sectionLocked) onToggleSection(section.id);
                  }}
                  className={`flex items-center justify-between w-full text-left p-4 ${
                    sectionLocked
                      ? "cursor-not-allowed opacity-60"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-gray-900 font-bold">
                    {index + 1}: {section.title}
                  </span>
                  {sectionLocked ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Lessons */}
                {isExpanded && section.lessons.length > 0 && (
                  <div className="bg-white border-t border-gray-100">
                    {section.lessons.map((lesson) => {
                      const lessonLocked = isLessonActuallyLocked(
                        index,
                        lesson
                      );

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            if (!lessonLocked)
                              onLessonClick(lesson.id, lessonLocked);
                          }}
                          className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-b-0 ${
                            lessonLocked
                              ? "opacity-60 pointer-events-none"
                              : "cursor-pointer hover:bg-gray-50"
                          } bg-white`}
                        >
                          {/* Left: Icon + Title */}
                          <div className="flex items-center gap-3">
                            {lesson.completed ? (
                              <div className="w-6 h-6 rounded-full bg-[#00AEEE] flex items-center justify-center flex-shrink-0">
                                <Check className="w-[14px] h-[14px] text-white" />
                              </div>
                            ) : lessonLocked ? (
                              <div className="w-6 h-6 flex-shrink-0" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                                <Check className="w-[14px] h-[14px] text-white" />
                              </div>
                            )}

                            <span
                              className={`text-sm ${
                                lessonLocked ? "text-gray-400" : "text-gray-700"
                              }`}
                            >
                              {lesson.title}
                            </span>
                          </div>

                          {/* Right: Lock if needed */}
                          {lessonLocked && (
                            <Lock className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Progress */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Learning Progress
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  {completedLessons} / {totalLessons} Lessons
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Files View */}
      {activeTab === "files" && (
        <div className="p-4 text-sm text-gray-600">
          {resources.length === 0 ? (
            <p>No resources yet.</p>
          ) : (
            <ul className="space-y-3">
              {resources.map((resource, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-lg"
                >
                  <span className="text-blue-700">{resource.name}</span>
                  {isPaid ? (
                    <a
                      href={resource.signedUrl}
                      download
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400 flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      Locked
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {!isPaid && (
            <button
              onClick={handleJoinCourse}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mt-4"
            >
              Join Course to Unlock
            </button>
          )}
        </div>
      )}
    </div>
  );
}
