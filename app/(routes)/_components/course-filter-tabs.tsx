"use client";

import { useRef, useEffect } from "react";

interface CourseFilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function CourseFilterTabs({
  activeFilter,
  onFilterChange,
}: CourseFilterTabsProps) {
  const filters = [
    "All",
    "AI Calling",
    "WhatsApp Chatbots",
    "Make Automations",
    "App Development",
    "Web Development",
    "Data Science",
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll horizontally with vertical mouse wheel
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="bg-[#5CB1D1] px-8 py-6 overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="relative left-[-30px] pr-4 flex gap-8 overflow-x-auto scrollbar-hide"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              px-6 py-3 rounded-md text-base font-semibold whitespace-nowrap transition-all duration-200 border
              ${
                activeFilter === filter
                  ? "bg-white text-gray-800 border-white"
                  : "bg-transparent text-white border-white hover:bg-white/10"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
