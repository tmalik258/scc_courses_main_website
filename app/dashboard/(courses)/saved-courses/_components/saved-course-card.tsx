/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Bookmark, Users, Star } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { DashedSpinner } from "@/components/dashed-spinner";
import { fetchImage } from "@/utils/supabase/fetchImage";

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
  isSaved?: boolean;
}

export function SavedCourseCard(props: SavedCourseCardProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserAndStatus = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getUser();
        if (!error && data.user) {
          const uid = data.user.id;
          setUserId(uid);

          const res = await fetch("/api/saved-courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: uid }),
          });

          if (!res.ok) {
            console.error("Error fetching saved courses:", res.statusText);
            return;
          }

          const savedData = await res.json();
          const savedCourseIds =
            savedData?.courses?.map((c: any) => c.id) || [];
          setIsSaved(savedCourseIds.includes(props.id));
        }
      } catch (err) {
        console.error("Error in fetchUserAndStatus:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndStatus();
  }, [props.id, supabase]);

  useEffect(() => {
    const loadImage = async () => {
      if (props.image && !imageUrl) {
        setImageLoading(true);
        try {
          const url = await fetchImage(props.image, "courses-resources");
          setImageUrl(url);
        } catch (err) {
          console.error("Error fetching image:", err);
          setImageUrl("/placeholder.svg");
        } finally {
          setImageLoading(false);
        }
      } else if (!props.image) {
        setImageUrl("/placeholder.svg");
        setImageLoading(false);
      }
    };

    loadImage();
  }, [props.image, imageUrl]);

  const handleBookmarkToggle = async () => {
    if (!userId) return;

    try {
      const res = await fetch("/api/toggle-save-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: props.id, userId }),
      });

      const data = await res.json();
      if (data?.success) {
        setIsSaved(data.saved);
      } else {
        console.error("Error toggling bookmark:", data.error);
      }
    } catch (err) {
      console.error("Error in handleBookmarkToggle:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6 relative">
      <div className="flex max-md:flex-wrap md:items-start max-md:gap-3 md:space-x-6">
        <div className="flex-shrink-0">
          {imageLoading ? (
            <div className="w-32 md:w-64 h-40 md:h-48 flex items-center justify-center">
              <DashedSpinner size={24} />
            </div>
          ) : (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={props.title}
              width={256}
              height={192}
              decoding="async"
              className="w-32 md:w-64 h-40 md:h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="flex-1">
          <div className="mb-3">
            <span
              className={`${props.categoryBgColor} ${props.categoryTextColor} text-xs px-3 py-1 rounded-full font-medium`}
            >
              {props.category}
            </span>
          </div>

          <div className="max-md:hidden flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-orange-500" />
              <span>{props.students}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{props.rating}</span>
            </div>
          </div>

          <h3 className="md:text-lg font-semibold text-gray-800 mb-2">
            {props.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4">{props.mentor}</p>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400 line-through text-sm">
              {props.originalPrice}
            </span>
            <span className="text-aqua-depth font-bold text-lg">
              {props.discountedPrice}
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 max-md:absolute max-md:top-4 max-md:left-4 flex flex-col items-center gap-1">
          <button
            onClick={handleBookmarkToggle}
            disabled={isLoading || !userId}
            className={`p-1 md:p-2 rounded md:rounded-lg transition-colors ${
              isSaved
                ? "text-aqua-depth bg-sky-50"
                : "text-gray-400 hover:text-aqua-depth hover:bg-sky-50"
            } ${isLoading || !userId ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4 md:h-6 md:w-6 text-aqua-depth"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Bookmark
                className={`w-4 h-4 md:w-6 md:h-6 ${
                  isSaved ? "fill-current" : ""
                }`}
              />
            )}
          </button>
          <span className="text-xs text-gray-600">
            {isLoading
              ? "Loading..."
              : isSaved
              ? "Remove from favourites"
              : "Add to favourites"}
          </span>
        </div>

        <div className="md:hidden flex justify-between flex-1 items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-orange-500" />
            <span>{props.students}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{props.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
