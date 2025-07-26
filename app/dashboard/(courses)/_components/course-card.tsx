"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

interface CourseCardProps {
  id: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentor: string;
  students: string;
  rating: string;
  price: string;
  image: string;
  originalPrice?: string;
  discountedPrice?: string;
  discount?: string;
}

export function CourseCard({
  id,
  category,
  categoryBgColor,
  categoryTextColor,
  title,
  mentor,
  students,
  rating,
  price,
  image,
}: CourseCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6">
      <div className="flex max-md:flex-col max-md:gap-3 md:items-start md:space-x-6">
        <div className="md:flex-shrink-0 max-md:flex-1">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={120}
            className="w-full md:w-48 h-28 object-cover rounded-md md:rounded-lg"
          />
        </div>

        <div className="flex-1">
          <div className="mb-3">
            <span
              className={`${categoryBgColor} ${categoryTextColor} text-xs px-3 py-1 rounded-md font-medium`}
            >
              {category}
            </span>
          </div>

          <h3 className="md:text-lg font-semibold text-gray-800 mb-2">
            {title}
          </h3>

          <p className="text-gray-500 text-sm mb-2">{mentor}</p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">{students}</span>
            <span className="text-sm font-medium text-gray-800">{rating}</span>
          </div>

          <p className="text-sm font-semibold text-gray-800">${price}</p>
        </div>

        <div className="flex-shrink-0">
          <Button
            className="bg-aqua-mist hover:bg-aqua-depth text-white px-6"
            onClick={() => router.push(`/courses/${id}`)}
          >
            View Course
          </Button>
        </div>
      </div>
    </div>
  );
}
