"use client"

import { useState } from "react"
import { Bookmark, Users, Star } from "lucide-react"
import Image from "next/image"

interface SavedCourseCardProps {
  category: string
  categoryColor: string
  title: string
  mentor: string
  students: string
  rating: string
  originalPrice: string
  discountedPrice: string
  image: string
}

export function SavedCourseCard({
  category,
  categoryColor,
  title,
  mentor,
  students,
  rating,
  originalPrice,
  discountedPrice,
  image,
}: SavedCourseCardProps) {
  const [isSaved, setIsSaved] = useState(true)

  const handleBookmarkToggle = () => {
    setIsSaved(!isSaved)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start space-x-6">
        {/* Course Image */}
        <div className="flex-shrink-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={120}
            className="w-48 h-28 object-cover rounded-lg"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1">
          {/* Category Badge */}
          <div className="mb-3">
            <span className={`${categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{category}</span>
          </div>

          {/* Course Stats */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

          {/* Mentor */}
          <p className="text-gray-500 text-sm mb-4">{mentor}</p>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 line-through text-sm">{originalPrice}</span>
            <span className="text-sky-500 font-bold text-lg">{discountedPrice}</span>
          </div>
        </div>

        {/* Bookmark Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleBookmarkToggle}
            className={`p-2 rounded-lg transition-colors ${
              isSaved ? "text-sky-500 bg-sky-50" : "text-gray-400 hover:text-sky-500 hover:bg-sky-50"
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  )
}
