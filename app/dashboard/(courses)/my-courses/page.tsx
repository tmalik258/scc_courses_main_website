"use client"

import { useState } from "react"
import { MyCourseCard } from "./_components/my-course-card"
import type { MyCourseCardProps } from "./_components/my-course-card"

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("All")


  const allCourses: MyCourseCardProps[] = [
    {
      category: "Data Science",
      categoryColor: "bg-blue-600",
      title: "Machine Learning with Python: From Basics to Deployment",
      mentor: "Mentor's Name",
      currentLesson: 10,
      totalLessons: 30,
      progress: 33,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      status: "active",
    },
    {
      category: "WhatsApp Chatbots",
      categoryColor: "bg-purple-500",
      title: "Build a WhatsApp Chatbot with Node.js & Twilio API",
      mentor: "Mentor's Name",
      currentLesson: 15,
      totalLessons: 50,
      progress: 33,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      status: "active",
    },
    {
      category: "AI Calling",
      categoryColor: "bg-green-500",
      title: "Create Smart Call Assistants using Voice AI",
      mentor: "Mentor's Name",
      currentLesson: 20,
      totalLessons: 40,
      progress: 50,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      status: "active",
    },
    {
      category: "Make Automations",
      categoryColor: "bg-orange-500",
      title: "Zapier 101: Automate Tasks Without Code",
      mentor: "Mentor's Name",
      currentLesson: 35,
      totalLessons: 35,
      progress: 100,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      status: "finished",
    },
    {
      category: "Web Development",
      categoryColor: "bg-aqua-mist",
      title: "Responsive Web Design with HTML, CSS & Flexbox",
      mentor: "Mentor's Name",
      currentLesson: 30,
      totalLessons: 30,
      progress: 100,
      image: "/images/course_placeholder_2.jpg?height=120&width=200",
      status: "finished",
    },
  ]

  const getFilteredCourses = () => {
    switch (activeTab) {
      case "Active":
        return allCourses.filter((course) => course.status === "active")
      case "Finished":
        return allCourses.filter((course) => course.status === "finished")
      default:
        return allCourses
    }
  }

  const filteredCourses = getFilteredCourses()

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-8 border-b border-gray-200">
          {["All", "Active", "Finished"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "border-aqua-mist text-aqua-mist"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-6">
        {filteredCourses.map((course, index) => (
          <MyCourseCard key={index} {...course} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No {activeTab.toLowerCase()} courses</h3>
          <p className="text-gray-600">
            {activeTab === "Active"
              ? "You don't have any active courses at the moment."
              : activeTab === "Finished"
                ? "You haven't completed any courses yet."
                : "You haven't enrolled in any courses yet."}
          </p>
        </div>
      )}
    </div>
  )
}
