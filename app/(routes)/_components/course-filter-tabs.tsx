"use client"

interface CourseFilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function CourseFilterTabs({ activeFilter, onFilterChange }: CourseFilterTabsProps) {
  const filters = [
    "All",
    "AI Calling",
    "WhatsApp Chatbots",
    "Make Automations",
    "App Development",
    "Web Development",
    "Data Science",
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeFilter === filter
              ? "bg-white text-gray-800 shadow-md"
              : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
