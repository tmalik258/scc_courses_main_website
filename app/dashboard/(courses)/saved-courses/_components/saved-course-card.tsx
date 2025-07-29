"use client";

import { useState, useEffect } from "react";
import { Bookmark, Users, Star } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

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
  const [isSaved, setIsSaved] = useState<boolean>(props.isSaved ?? false);

  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserAndStatus = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        const uid = data.user.id;
        setUserId(uid);

        // Check if this course is saved
        const res = await fetch("/api/saved-courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: uid }),
        });

        const savedData = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const savedCourseIds = savedData?.courses?.map((c: any) => c.id) || [];

        setIsSaved(savedCourseIds.includes(props.id));
      }
    };

    fetchUserAndStatus();
  }, [props.id, supabase]);

  const handleBookmarkToggle = async () => {
    if (!userId) return;

    const res = await fetch("/api/toggle-save-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId: props.id, userId }),
    });

    const data = await res.json();
    if (data?.success) {
      setIsSaved(data.saved); // true if saved, false if unsaved
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6 relative">
      <div className="flex max-md:flex-wrap md:items-start max-md:gap-3 md:space-x-6">
        <div className="flex-shrink-0">
          <Image
            src={props.image || "/placeholder.svg"}
            alt={props.title}
            width={200}
            height={120}
            className="w-24 md:w-48 h-28 object-cover rounded-lg"
          />
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

        {/* Bookmark button */}
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
