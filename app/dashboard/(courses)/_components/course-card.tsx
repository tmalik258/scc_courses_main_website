import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

interface CourseCardProps {
  category: string
  categoryColor: string
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
  category,
  categoryColor,
  title,
  mentor,
  currentLesson,
  totalLessons,
  progress,
  image,
  isCompleted = false,
  completedDate,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-start space-x-6">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={120}
            className="w-48 h-28 object-cover rounded-lg"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1">
          {/* Category Badge and Completion Status */}
          <div className="flex items-center justify-between mb-3">
            <span className={`${categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{category}</span>
            {isCompleted && completedDate && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Completed on {completedDate}</span>
              </div>
            )}
          </div>

          {/* Course Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

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
          <Button className="bg-sky-400 hover:bg-sky-500 text-white px-6">View Course</Button>
        </div>
      </div>
    </div>
  )
}
