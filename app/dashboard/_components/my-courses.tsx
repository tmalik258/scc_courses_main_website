import { ArrowRight } from "lucide-react"
import { CourseProgressCard } from "./course-progress-card"

export function MyCourses() {
  const courses = [
    {
      category: "Data Science",
      categoryColor: "bg-blue-600",
      title: "Machine Learning with Python: From Basics to Deployment",
      currentLesson: 10,
      totalLessons: 30,
      progress: 33,
    },
    {
      category: "WhatsApp Chatbots",
      categoryColor: "bg-purple-500",
      title: "Build a WhatsApp Chatbot with Node.js & Twilio API",
      currentLesson: 15,
      totalLessons: 50,
      progress: 33,
    },
    {
      category: "Data Science",
      categoryColor: "bg-blue-600",
      title: "Data Visualization with Tableau & Power BI",
      currentLesson: 14,
      totalLessons: 40,
      progress: 40,
    },
    {
      category: "AI Calling",
      categoryColor: "bg-green-500",
      title: "Create Smart Call Assistants using Voice AI",
      currentLesson: 20,
      totalLessons: 40,
      progress: 50,
    },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Course</h2>
        <button className="flex items-center text-aqua-mist hover:text-aqua-depth text-sm font-medium">
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course, index) => (
          <CourseProgressCard key={index} {...course} />
        ))}
      </div>
    </div>
  )
}
