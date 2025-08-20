"use client";

import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface FiltersState {
  categories: string[];
  priceRange: string;
  rating: string;
}

interface CourseFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  categories?: string[];
}

export default function CourseFilters({
  filters,
  onFilterChange,
  categories = [],
}: CourseFiltersProps) {
  const priceRanges = [
    "All",
    "Under ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "Above ₹2000",
  ];
  const ratings = ["All", "5.0", "4.0+", "3.0+", "2.0+", "1.0+"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [category] : [];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (price: string) => {
    onFilterChange({ ...filters, priceRange: price });
  };

  const handleRatingChange = (rating: string) => {
    onFilterChange({ ...filters, rating });
  };

  return (
    <div className="p-6">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 font-manrope">
        Filter by
      </h3>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Category</h4>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
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

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price</h4>
        <div className="space-y-2">
          {priceRanges.map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <input
                type="radio"
                id={price}
                name="price"
                checked={filters.priceRange === price}
                onChange={() => handlePriceChange(price)}
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
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Rating</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <input
                type="radio"
                id={rating}
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
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
      </div>
    </div>
  );
}
