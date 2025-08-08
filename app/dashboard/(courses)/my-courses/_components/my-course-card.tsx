"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DashedSpinner } from "@/components/dashed-spinner";
import { fetchImage } from "@/utils/supabase/fetchImage";
import { useRouter } from "nextjs-toploader/app";

export interface MyCourseCardProps {
  id: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
  title: string;
  mentor: string;
  currentLesson: number;
  totalLessons: number;
  progress: number;
  image: string;
  status: "active" | "finished";
}

export function MyCourseCard({
  id,
  category,
  categoryBgColor,
  categoryTextColor,
  title,
  mentor,
  currentLesson,
  totalLessons,
  progress,
  image,
  status,
}: MyCourseCardProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      console.log(`[MyCourseCard ${id}] Loading image:`, {
        image,
        isEmpty: !image || image.trim() === "",
      });
      setImageLoading(true);
      try {
        if (image && image.trim() !== "") {
          const url = await fetchImage(image, "courses-resources");
          if (!url || typeof url !== "string") {
            throw new Error("fetchImage returned invalid or no URL");
          }
          console.log(`[MyCourseCard ${id}] Image fetched successfully:`, url);
          setImageUrl(url);
        } else {
          console.warn(
            `[MyCourseCard ${id}] No valid image provided, using placeholder`
          );
          setImageUrl("/images/course_placeholder.jpg");
        }
      } catch (err) {
        console.error(`[MyCourseCard ${id}] Error fetching image:`, err);
        setImageUrl("/images/course_placeholder.jpg");
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();
  }, [image, id]);

  const handleViewCourse = () => {
    const courseRoute = `/courses/${id}`;
    console.log(`[MyCourseCard ${id}] Attempting navigation to:`, courseRoute);
    try {
      router.push(courseRoute);
    } catch (err) {
      console.error(`[MyCourseCard ${id}] Navigation error:`, err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex max-md:gap-3 max-md:flex-col md:items-start md:space-x-6">
        {/* Course Image */}
        <div className="flex-shrink-0">
          {imageLoading ? (
            <div className="w-32 md:w-64 h-40 md:h-48 flex items-center justify-center">
              <DashedSpinner size={24} />
            </div>
          ) : (
            <Image
              src={imageUrl || "/images/course_placeholder.jpg"}
              alt={title}
              width={256}
              height={192}
              decoding="async"
              className="w-32 md:w-64 h-40 md:h-48 object-cover rounded-lg"
              onError={(e) => {
                console.error(
                  `[MyCourseCard ${id}] Image failed to load:`,
                  imageUrl
                );
                setImageUrl("/images/course_placeholder.jpg");
                e.currentTarget.src = "/images/course_placeholder.jpg";
              }}
            />
          )}
        </div>

        {/* Course Content */}
        <div className="flex-1">
          {/* Category Badge */}
          <div className="mb-3">
            <span
              className={`${categoryBgColor} ${categoryTextColor} text-xs px-3 py-1 rounded-md font-medium`}
            >
              {category}
            </span>
          </div>

          {/* Course Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

          {/* Mentor */}
          <p className="text-gray-500 text-sm mb-4">{mentor}</p>

          {/* Progress Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {currentLesson}/{totalLessons} Lessons
              </span>
              <span className="text-sm font-medium text-gray-800">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  status === "finished" ? "bg-green-500" : "bg-aqua-mist"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Button
            onClick={handleViewCourse}
            className="bg-aqua-mist hover:bg-aqua-depth text-white px-6"
          >
            View Course
          </Button>
        </div>
      </div>
    </div>
  );
}
