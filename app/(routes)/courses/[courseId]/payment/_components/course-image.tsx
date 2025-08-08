"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { DashedSpinner } from "@/components/dashed-spinner";
import { fetchImage } from "@/utils/supabase/fetchImage";

interface CourseImageProps {
  imageUrl: string;
  alt?: string;
}

export function CourseImage({
  imageUrl,
  alt = "Course image",
}: CourseImageProps) {
  const [resolvedImageUrl, setResolvedImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      console.log(`[CourseImage] Loading image:`, {
        imageUrl,
        isEmpty: !imageUrl || imageUrl.trim() === "",
      });
      setImageLoading(true);
      try {
        if (imageUrl && imageUrl.trim() !== "") {
          const url = await fetchImage(imageUrl, "courses-resources");
          if (!url || typeof url !== "string") {
            throw new Error("fetchImage returned invalid or no URL");
          }
          console.log(`[CourseImage] Image fetched successfully:`, url);
          setResolvedImageUrl(url);
        } else {
          console.warn(
            `[CourseImage] No valid image provided, using placeholder`
          );
          setResolvedImageUrl("/images/course_placeholder.jpg");
        }
      } catch (err) {
        console.error(`[CourseImage] Error fetching image:`, err);
        setResolvedImageUrl("/images/course_placeholder.jpg");
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();
  }, [imageUrl]);

  return (
    <div className="relative">
      {imageLoading ? (
        <div className="w-full h-48 flex items-center justify-center">
          <DashedSpinner size={24} />
        </div>
      ) : (
        <Image
          src={resolvedImageUrl || "/images/course_placeholder.jpg"}
          alt={alt}
          width={280}
          height={200}
          decoding="async"
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            console.error(
              `[CourseImage] Image failed to load:`,
              resolvedImageUrl
            );
            setResolvedImageUrl("/images/course_placeholder.jpg");
            e.currentTarget.src = "/images/course_placeholder.jpg";
          }}
        />
      )}
    </div>
  );
}
