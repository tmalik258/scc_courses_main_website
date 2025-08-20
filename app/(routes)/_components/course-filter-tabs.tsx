"use client";

import { useSearchParams } from "next/navigation";

interface CourseFilterTabsProps {
  activeFilter?: string;
  onFilterChange: (filter: string) => void;
  browseCourses?: boolean;
  filters?: string[];
}

export function CourseFilterTabs({
  activeFilter,
  onFilterChange,
  browseCourses = false,
  filters = ["All"],
}: CourseFilterTabsProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All";
  const effectiveActiveFilter = browseCourses
    ? categoryFromUrl
    : activeFilter || "All";

  return (
    <div className="mb-8">
      <div
        className="flex gap-3 overflow-x-auto overflow-y-hidden scrollbar-none pb-2 -mb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {filters.map((filter) => {
          const isActive = effectiveActiveFilter === filter;

          const baseClasses =
            "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0";

          const activeClasses = browseCourses
            ? "bg-aqua-mist text-white shadow-md"
            : "bg-white text-gray-800 shadow-md";

          const inactiveClasses = browseCourses
            ? "bg-aqua-mist/20 text-aqua-mist hover:bg-aqua-depth/30 border border-aqua-depth/30"
            : "bg-white/20 text-white hover:bg-white/30 border border-white/30";

          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
