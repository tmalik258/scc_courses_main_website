"use client";

import { fetchImage } from "@/utils/supabase/fetchImage";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { randomColorGenerator } from "@/utils/category";

export interface CourseCardProps {
  price: string | number;
  id: string;
  category: string;
  title: string;
  mentor: string;
  students: string;
  rating: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  thumbnailUrl: string | null | undefined;
}

export function CourseCard({
  id,
  category,
  title,
  mentor,
  students,
  rating,
  originalPrice,
  discountedPrice,
  discount,
  thumbnailUrl,
}: CourseCardProps) {
  const router = useRouter();
  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(null);

  // Generate colors if not provided as props
  const [colors] = useState<string[]>(() => {
    return randomColorGenerator().split(" ");
  });

  // Extract the background and text colors
  const categoryBgColor = colors[0];
  const categoryTextColor = colors[1];

  const handleClick = () => {
    router.push(`/courses/${id}`);
  };

  useEffect(() => {
    console.log("thumbnail URL:", thumbnailUrl);
    (async () => {
      if (thumbnailUrl && !displayImageUrl) {
        try {
          const fetchedUrl = await fetchImage(
            thumbnailUrl,
            "courses-resources"
          );
          setDisplayImageUrl(fetchedUrl ?? "/images/course_placeholder.jpg");
        } catch {
          setDisplayImageUrl("/images/course_placeholder.jpg");
        }
      }
    })();
  }, [thumbnailUrl]);

  // Use displayImageUrl with fallbacks
  const imageSrc =
    displayImageUrl || thumbnailUrl || "/images/course_placeholder.jpg";

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Discount Badge - Mobile positioned absolutely */}
      <div className="absolute top-3 right-3 z-10 md:hidden">
        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-sm font-medium font-manrope">
          {discount}
        </span>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-2 p-3 px-2">
          {/* Course Image - Left side on mobile */}
          <div className="flex-shrink-0 w-24 h-auto">
            <Image
              src={imageSrc}
              alt={title}
              width={96}
              height={80}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          {/* Course Content - Right side on mobile */}
          <div className="flex-1 min-w-0">
            {/* Category Badge */}
            <div className="mb-2">
              <span
                className={`${categoryBgColor} ${categoryTextColor} text-xs px-2 py-1 rounded-sm font-medium`}
              >
                {category}
              </span>
            </div>

            {/* Course Title */}
            <h3 className="font-bold text-sm text-gray-800 mb-1 line-clamp-2 leading-tight">
              {title}
            </h3>

            {/* Mentor */}
            <p className="text-gray-500 text-xs mb-2 font-manrope">{mentor}</p>
          </div>
        </div>

        {/* Bottom section with stats and pricing */}
        <div className="flex justify-between items-center px-3 pb-2">
          {/* Stats */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11.2813C17.66 11.2813 18.99 9.94125 18.99 8.28125C18.99 6.62125 17.66 5.28125 16 5.28125C14.34 5.28125 13 6.62125 13 8.28125C13 9.94125 14.34 11.2813 16 11.2813ZM8 11.2813C9.66 11.2813 10.99 9.94125 10.99 8.28125C10.99 6.62125 9.66 5.28125 8 5.28125C6.34 5.28125 5 6.62125 5 8.28125C5 9.94125 6.34 11.2813 8 11.2813ZM8 13.2813C5.67 13.2813 1 14.4513 1 16.7813V19.2813H15V16.7813C15 14.4513 10.33 13.2813 8 13.2813ZM16 13.2813C15.71 13.2813 15.38 13.3013 15.03 13.3313C16.19 14.1713 17 15.3013 17 16.7813V19.2813H23V16.7813C23 14.4513 18.33 13.2813 16 13.2813Z"
                  fill="#FFBB00"
                />
              </svg>
              <span className="font-manrope text-xs">{students}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              ₹{originalPrice}
            </span>
            <span className="text-aqua-mist font-extrabold text-lg">
              ₹{discountedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block">
        {/* Course Image */}
        <div className="relative w-full h-48 p-3">
          <Image
            src={imageSrc}
            alt={title}
            width={350}
            height={200}
            className="w-full h-full object-cover rounded-md overflow-hidden"
          />
        </div>

        {/* Course Content */}
        <div className="p-4 pt-0 pb-3">
          {/* Category Badge */}
          <div className="mb-3">
            <span
              className={`${categoryBgColor} ${categoryTextColor} text-xs px-3 py-1 rounded-sm font-medium`}
            >
              {category}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11.2813C17.66 11.2813 18.99 9.94125 18.99 8.28125C18.99 6.62125 17.66 5.28125 16 5.28125C14.34 5.28125 13 6.62125 13 8.28125C13 9.94125 14.34 11.2813 16 11.2813ZM8 11.2813C9.66 11.2813 10.99 9.94125 10.99 8.28125C10.99 6.62125 9.66 5.28125 8 5.28125C6.34 5.28125 5 6.62125 5 8.28125C5 9.94125 6.34 11.2813 8 11.2813ZM8 13.2813C5.67 13.2813 1 14.4513 1 16.7813V19.2813H15V16.7813C15 14.4513 10.33 13.2813 8 13.2813ZM16 13.2813C15.71 13.2813 15.38 13.3013 15.03 13.3313C16.19 14.1713 17 15.3013 17 16.7813V19.2813H23V16.7813C23 14.4513 18.33 13.2813 16 13.2813Z"
                  fill="#FFBB00"
                />
              </svg>
              <span className="font-manrope text-sm">{students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Mentor */}
          <p className="text-gray-500 mb-4 font-manrope">{mentor}</p>

          {/* Pricing */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 line-through text-xl">
                ₹{originalPrice}
              </span>
              <span className="text-aqua-mist font-extrabold text-2xl">
                ₹{discountedPrice}
              </span>
            </div>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-sm font-medium font-manrope">
              {discount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
