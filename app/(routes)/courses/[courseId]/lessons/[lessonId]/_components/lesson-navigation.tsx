"use client";

import { Button } from "@/components/ui/button";

interface LessonNavigationProps {
  lessonTitle: string;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isPaid: boolean;
  isPaidLesson: boolean;
}

export function LessonNavigation({
  lessonTitle,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: // isPaid,
// isPaidLesson,
LessonNavigationProps) {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="text-gray-800 font-medium">{lessonTitle}</div>
      <div className="flex space-x-3 max-md:hidden">
        <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
          Previous
        </Button>
        <Button
          className="bg-aqua-mist hover:bg-aqua-depth"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next Chapter
        </Button>
      </div>
    </div>
  );
}
