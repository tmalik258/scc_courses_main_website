"use client";

interface CourseFilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  browseCourses?: boolean;
}

export function CourseFilterTabs({
  activeFilter,
  onFilterChange,
  browseCourses = false,
}: CourseFilterTabsProps) {
  const filters = [
    "All",
    "AI Calling",
    "WhatsApp Chatbots",
    "Make Automations",
    "App Development",
    "Web Development",
    "Data Science",
    "Mobile Development",
  ];

  return (
    <div className="mb-8">
      <div
        className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-none pb-2 -mb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
              activeFilter === filter
                ? `${
                    browseCourses
                      ? "bg-aqua-mist text-white"
                      : "bg-white text-gray-800"
                  } shadow-md`
                : browseCourses
                ? `bg-aqua-mist/20 text-aqua-mist hover:bg-aqua-depth/30 border border-aqua-depth/30`
                : `bg-white/20 text-white hover:bg-white/30 border border-white/30`
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
