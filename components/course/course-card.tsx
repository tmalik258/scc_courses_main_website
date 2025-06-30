import { Users, Star } from "lucide-react"
import Image from "next/image"

interface CourseCardProps {
  category: string
  categoryColor: string
  title: string
  mentor: string
  students: string
  rating: string
  originalPrice: string
  discountedPrice: string
  discount: string
  image: string
}

export function CourseCard({
  category,
  categoryColor,
  title,
  mentor,
  students,
  rating,
  originalPrice,
  discountedPrice,
  discount,
  image,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Course Image */}
      <div className="relative w-full h-48 p-3">
        <Image src={image || "/images/courses_placeholder.jpg"} alt={title} width={350} height={200} className="w-full h-full object-cover rounded-lg overflow-hidden" />
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`${categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium`}>{category}</span>
        </div>

        {/* Stats */}
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
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">{title}</h3>

        {/* Mentor */}
        <p className="text-gray-500 text-sm mb-4">{mentor}</p>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">₹{originalPrice}</span>
            <span className="text-blue-500 font-bold text-lg">₹{discountedPrice}</span>
          </div>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-medium">{discount}</span>
        </div>
      </div>
    </div>
  )
}
