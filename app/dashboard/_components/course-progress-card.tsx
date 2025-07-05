import { Button } from "@/components/ui/button"

interface CourseProgressCardProps {
  category: string
  categoryColor: string
  title: string
  currentLesson: number
  totalLessons: number
  progress: number
}

export function CourseProgressCard({
  category,
  categoryColor,
  title,
  currentLesson,
  totalLessons,
  progress,
}: CourseProgressCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-4">
      <div className="mb-4">
        <span className={`${categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{category}</span>
      </div>

      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            {currentLesson}/{totalLessons} Lessons
          </span>
          <span className="text-sm font-medium text-gray-800">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <Button className="w-full bg-aqua-mist hover:bg-aqua-depth text-white">Continue Learning</Button>
    </div>
  )
}
