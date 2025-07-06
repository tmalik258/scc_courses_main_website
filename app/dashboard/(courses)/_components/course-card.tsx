"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "nextjs-toploader/app"

interface CourseCardProps {
  id: number
  category: string
  categoryBgColor: string
  categoryTextColor: string
  title: string
  mentor: string
  currentLesson: number
  totalLessons: number
  progress: number
  image: string
  isCompleted?: boolean
  completedDate?: string
}

export function CourseCard({
  id,
  category,
  categoryBgColor,
  categoryTextColor,
  title,
  mentor,
  currentLesson,
  totalLessons,
  progress,
  image,
  isCompleted = false,
  completedDate,
}: CourseCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
      <div className="flex max-md:flex-col max-md:gap-3 md:items-start md:space-x-6">
        {/* Course Image */}
        <div className="md:flex-shrink-0 max-md:flex-1">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={120}
            className="w-full md:w-48 h-28 object-cover rounded-md md:rounded-lg"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1">
          {/* Category Badge and Completion Status */}
          <div className="flex items-center justify-between mb-3">
            <span className={`${categoryBgColor} ${categoryTextColor} text-xs px-3 py-1 rounded-md font-medium`}>{category}</span>
            {isCompleted && completedDate && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs md:text-sm">Completed on {completedDate}</span>
              </div>
            )}
          </div>

          {/* Course Title */}
          <h3 className="md:text-lg font-semibold text-gray-800 mb-2">{title}</h3>

          {/* Mentor */}
          <p className="text-gray-500 text-sm mb-4">{mentor}</p>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {currentLesson}/{totalLessons} Lessons
              </span>
              <span className="text-sm font-medium text-gray-800">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Button className="bg-aqua-mist hover:bg-aqua-depth text-white px-6" onClick={() => router.push(`/courses/${id}`)}>View Course</Button>
        </div>
      </div>
    </div>
  )
}
