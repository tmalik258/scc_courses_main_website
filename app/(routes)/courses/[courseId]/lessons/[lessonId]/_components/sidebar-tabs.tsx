"use client"

interface SidebarTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SidebarTabs({ activeTab, onTabChange }: SidebarTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-6">
        <button
          onClick={() => onTabChange("lessons")}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "lessons"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Course Lessons
        </button>
        <button
          onClick={() => onTabChange("files")}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "files"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          File
        </button>
      </div>
    </div>
  )
}
