import { ChevronRight } from "lucide-react"

export function CourseBreadcrumb() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <a href="#" className="hover:font-medium font-normal">
            Courses
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium overflow-hidden text-ellipsis">Machine Learning with Python: From Basics to Deployment</span>
        </div>
      </div>
    </div>
  )
}
