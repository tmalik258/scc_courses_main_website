"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TestimonialType } from "@/types/testimonial";
import { fetchImage } from "@/utils/supabase/fetchImage";
import { DashedSpinner } from "@/components/dashed-spinner";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: TestimonialType;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      console.log(`[TestimonialCard ${testimonial.id}] Loading image:`, {
        avatar: testimonial.avatar,
        isEmpty: !testimonial.avatar,
      });
      setImageLoading(true);
      try {
        const imageSource = testimonial.avatar;
        if (imageSource && imageSource.trim() !== "") {
          const url = await fetchImage(imageSource);
          if (!url || typeof url !== "string") {
            throw new Error("fetchImage returned invalid or no URL");
          }
          console.log(
            `[TestimonialCard ${testimonial.id}] Image fetched successfully:`,
            url
          );
          setImageUrl(url);
        } else {
          console.warn(
            `[TestimonialCard ${testimonial.id}] No valid avatar provided, using placeholder`
          );
          setImageUrl("/images/landing_page/testimonial_placeholder.jpg");
        }
      } catch (err) {
        console.error(
          `[TestimonialCard ${testimonial.id}] Error fetching image:`,
          err
        );
        setImageUrl("/images/landing_page/testimonial_placeholder.jpg");
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();
  }, [testimonial.avatar, testimonial.id]);

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(testimonial.rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getAvatarFallback = () => {
    return testimonial.name
      ? testimonial.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "UK";
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="p-6 shadow-sm border border-gray-200 rounded-lg min-h-[300px] min-w-[300px]">
        <div className="p-0 space-y-4 h-full flex flex-col justify-between">
          {/* Star Rating */}
          <div className="flex gap-1">{renderStars()}</div>

          {/* Quote Icon */}
          <div className="flex justify-end">
            <Quote className="w-8 h-8 text-[#5CB1D1] fill-current" />
          </div>

          {/* Testimonial Text */}
          <div className="text-gray-700 text-base leading-relaxed -mt-2 overflow-y-auto flex-grow">
            {testimonial.review || "No review available"}
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              {imageLoading ? (
                <div className="flex items-center justify-center w-12 h-12">
                  <DashedSpinner size={16} />
                </div>
              ) : (
                <Image
                  src={imageUrl || "/images/default-profile-pic.png"}
                  alt={testimonial.name || "User avatar"}
                  width={48}
                  height={48}
                  decoding="async"
                  className="rounded-full object-cover w-12 h-12"
                  onError={(e) => {
                    console.error(
                      `[TestimonialCard ${testimonial.id}] Image failed to load:`,
                      imageUrl
                    );
                    e.currentTarget.src =
                      "/images/landing_page/testimonial_placeholder.jpg";
                  }}
                />
              )}
              {!imageUrl && !imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full">
                  {getAvatarFallback()}
                </div>
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-500">
                {testimonial.title || "No title available"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
