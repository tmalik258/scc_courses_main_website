"use client";

import { useState } from "react";
import { Bookmark, Users, Star } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "nextjs-toploader/app";

interface SavedCourseCardProps {
  id: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentor: string;
  students: string;
  rating: string;
  originalPrice: string;
  discountedPrice: string;
  image: string;
}

export function SavedCourseCard({
  id,
  category,
  categoryBgColor,
  categoryTextColor,
  title,
  mentor,
  students,
  rating,
  originalPrice,
  discountedPrice,
  image,
}: SavedCourseCardProps) {
  const [isSaved, setIsSaved] = useState(true);
  // const router = useRouter();

  const handleBookmarkToggle = () => {
    setIsSaved(!isSaved);
  };

  console.log("id", id);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6 relative">
      <div className="flex max-md:flex-wrap md:items-start max-md:gap-3 md:space-x-6">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={120}
            className="w-24 md:w-48 h-28 object-cover rounded-lg"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1">
          {/* Category Badge */}
          <div className="mb-3">
            <span
              className={`${categoryBgColor} ${categoryTextColor} text-xs px-3 py-1 rounded-full font-medium`}
            >
              {category}
            </span>
          </div>

          {/* Course Stats */}
          <div className="max-md:hidden flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-orange-500" />
              <span>{students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="md:text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h3>

          {/* Mentor */}
          <p className="text-gray-500 text-sm mb-4">{mentor}</p>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 line-through text-sm">
              {originalPrice}
            </span>
            <span className="text-aqua-depth font-bold text-lg">
              {discountedPrice}
            </span>
          </div>
        </div>

        {/* Bookmark Button */}
        <div className="flex-shrink-0 max-md:absolute max-md:top-4 max-md:left-4">
          <button
            onClick={handleBookmarkToggle}
            className={`p-1 md:p-2 rounded md:rounded-lg transition-colors ${
              isSaved
                ? "text-aqua-depth bg-sky-50"
                : "text-gray-400 hover:text-aqua-depth hover:bg-sky-50"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 md:w-6 md:h-6 ${
                isSaved ? "fill-current" : ""
              }`}
            />
          </button>
        </div>

        <div className="md:hidden flex justify-between flex-1 items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-orange-500" />
            <span>{students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
