"use client";

import { Play } from "lucide-react";
import Image from "next/image";

interface LessonVideoProps {
  video_url: string | null;
}

export function LessonVideo({ video_url }: LessonVideoProps) {
  if (!video_url) {
    return (
      <div className="relative bg-gray-800 rounded-lg overflow-hidden mb-6">
        <Image
          src="https://source.unsplash.com/800x450/?learning,education"
          alt="Course thumbnail"
          width={600}
          height={300}
          className="w-full md:h-[500px] object-cover object-top brightness-45"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="relative bg-transparent hover:bg-opacity-100 rounded-full p-3 py-4 transition-all duration-200">
            <div className="absolute inset-0 bg-gray-300/35 rounded-full" />
            <div className="absolute inset-0 bg-gray-300/30 blur-lg rounded-full" />
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
    >
      <video className="absolute top-0 left-0 w-full h-full" controls>
        <source src={video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
