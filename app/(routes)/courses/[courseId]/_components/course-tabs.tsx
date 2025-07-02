"use client"

interface CourseTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function CourseTabs({ activeTab, onTabChange }: CourseTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "lessons", label: "Course Lessons" },
    { id: "instructors", label: "Instructors" },
    { id: "reviews", label: "Student Reviews" },
  ]

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 flex-1 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
