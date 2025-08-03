"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CourseFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: string;
    rating: string;
  }) => void;
}

export default function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
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
    "Mobile Development",
  ];

  const priceRanges = [
    "All",
    "Under ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "Above ₹2000",
  ];

  const ratings = ["All", "5.0", "4.0+", "3.0+", "2.0+", "1.0+"];

  useEffect(() => {
    const category = searchParams.get("category") || "";
    setSelectedFilters((prev) => ({
      ...prev,
      categories: category && categories.includes(category) ? [category] : [],
    }));
    onFilterChange({
      ...selectedFilters,
      categories: category && categories.includes(category) ? [category] : [],
    });
  }, [searchParams]);

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
    <div className="max-w-7xl mx-auto px-6 py-6 md:py-16">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 font-manrope">
        Filter by
      </h3>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left text-base md:text-lg font-semibold text-gray-800 mb-3 font-manrope"
        >
          Category
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedFilters.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                  className="text-blue-500"
                />
                <label
                  htmlFor={category}
                  className="text-sm text-gray-600 cursor-pointer font-manrope"
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
          className="flex items-center justify-between w-full text-left text-base md:text-lg font-semibold text-gray-800 mb-3 font-manrope"
        >
          Price
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-2">
            {priceRanges.map((price) => (
              <div key={price} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={price}
                  name="price"
                  checked={selectedFilters.priceRange === price}
                  onChange={() => handlePriceChange(price)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor={price}
                  className="text-sm text-gray-600 cursor-pointer font-manrope"
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
          className="flex items-center justify-between w-full text-left text-base md:text-lg font-semibold text-gray-800 mb-3 font-manrope"
        >
          Rating
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={rating}
                  name="rating"
                  checked={selectedFilters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <label
                  htmlFor={rating}
                  className="text-sm text-gray-600 cursor-pointer font-manrope flex items-center gap-2"
                >
                  <div className="flex">
                    {rating !== "All" &&
                      Array.from({ length: parseInt(rating) }, (_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-500 fill-current inline"
                        />
                      ))}
                  </div>
                  ({rating})
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
