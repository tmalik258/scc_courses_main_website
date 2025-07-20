"use client"

import { Button } from "@/components/ui/button"

interface LessonNavigationProps {
  lessonTitle: string
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function LessonNavigation({ lessonTitle, onPrevious, onNext, hasPrevious, hasNext }: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{lessonTitle}</h1>
      <div className="flex space-x-3 max-md:hidden">
        <Button
          variant="outline"
          className="px-6 bg-transparent border-gray-300"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          Previous
        </Button>
        <Button className="bg-aqua-mist hover:bg-aqua-depth px-6" onClick={onNext} disabled={!hasNext}>
          Next Chapter
        </Button>
      </div>
    </div>
  )
}
