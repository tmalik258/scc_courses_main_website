import { Users, Star, Clock } from "lucide-react"

export function CourseInfo() {
  return (
    <div className="space-y-4">
      {/* Category Badge */}
      <div>
        <span className="bg-sky-tint text-sky-base text-sm px-3 py-1 rounded font-medium">Data Science</span>
      </div>

      {/* Course Title */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">Machine Learning with Python: From Basics to Deployment</h1>

      {/* Course Stats */}
      <div className="flex items-center max-md:justify-between md:gap-6 text-xs md:text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-orange-500" />
          <span>320+ students</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span>4.8/5</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>20 hours duration</span>
        </div>
      </div>
    </div>
  )
}
