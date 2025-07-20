"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CourseFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: string;
    rating: string;
  }) => void;
}

export function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    priceRange: "All",
    rating: "All",
  });

  const categories = [
    "AI Calling",
    "WhatsApp Chatbots",
    "Make Automations",
    "App Development",
    "Web Development",
    "Data Science",
  ];

  const priceRanges = [
    "All",
    "Under ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "Above ₹2000",
  ];

  const ratings = ["All", "5.0", "4.0+", "3.0+", "2.0+", "1.0+"];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedFilters.categories, category]
      : selectedFilters.categories.filter((c) => c !== category);

    const newFilters = { ...selectedFilters, categories: newCategories };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (price: string) => {
    const newFilters = { ...selectedFilters, priceRange: price };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (rating: string) => {
    const newFilters = { ...selectedFilters, rating };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-64 bg-white p-6 border rounded-sm h-fit border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-4">Filter by</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
        >
          Category
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedFilters.categories.includes(category)}
                  onChange={(e) =>
                    handleCategoryChange(category, e.target.checked)
                  }
                  className="w-4 h-4 appearance-none border border-gray-300 rounded-none checked:bg-[#5CB1D1] checked:border-transparent checked:text-white flex items-center justify-center focus:ring-2 focus:ring-[#5CB1D1] focus:outline-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.00039 11.2002L2.80039 8.0002L1.86606 8.93354L6.00039 13.0679L15.0004 4.06787L14.0671 3.13454L6.00039 11.2002Z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "70%",
                  }}
                />
                <label
                  htmlFor={category}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
        >
          Price
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((price) => (
              <div key={price} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id={price}
                  name="price"
                  checked={selectedFilters.priceRange === price}
                  onChange={() => handlePriceChange(price)}
                  className="w-4 h-4 appearance-none border border-gray-300 rounded-none checked:bg-[#5CB1D1] checked:border-transparent focus:ring-2 focus:ring-[#5CB1D1] focus:outline-none"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "55%",
                  }}
                />
                <label
                  htmlFor={price}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {price}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-left font-medium text-gray-700 mb-3"
        >
          Rating
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id={rating}
                  name="rating"
                  checked={selectedFilters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="accent-[#5CB1D1] w-4 h-4"
                />
                <label
                  htmlFor={rating}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {rating}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
