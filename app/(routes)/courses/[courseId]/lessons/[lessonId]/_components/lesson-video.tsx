"use client";

import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchVideoUrl } from "@/utils/supabase/fetchVideo"; // Adjust path to your fetchVideo.ts

interface LessonVideoProps {
  signedUrl: string | null; // Keep as signedUrl for compatibility
}

export function LessonVideo({ signedUrl }: LessonVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSignedUrl, setVideoSignedUrl] = useState<string | null>(null); // Internal state for signed URL
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    if (signedUrl && !videoSignedUrl) {
      // Fetch signed URL when play is clicked
      const getSignedUrl = async () => {
        try {
          setIsLoading(true);
          console.log("Fetching signed URL for:", signedUrl);
          const url = await fetchVideoUrl(signedUrl);
          if (!url) {
            setError("Failed to load video URL");
            return;
          }
          setVideoSignedUrl(url);
        } catch (err) {
          console.error("Error fetching signed URL:", err);
          setError("Failed to load video");
        } finally {
          setIsLoading(false);
        }
      };
      getSignedUrl();
    }
  }, [isPlaying, signedUrl, videoSignedUrl]);

  if (error) {
    return <div className="text-red-600 text-center py-4">Error: {error}</div>;
  }

  if (!signedUrl || !isPlaying || !videoSignedUrl) {
    return (
      <div className="relative min-h-[500px] border border-gray-100 rounded-lg overflow-hidden mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          {signedUrl && videoSignedUrl && (
            <video
              className="absolute inset-0 w-full h-full"
              onError={(e) => {
                console.error("Video playback error:", e);
                setError("Failed to load video. Please try again.");
              }}
              src={videoSignedUrl}
              typeof="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-white"
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
            </div>
          ) : (
            <button
              className="relative bg-transparent hover:bg-opacity-100 rounded-full p-3 py-4 transition-all duration-200"
              onClick={() => setIsPlaying(true)}
            >
              <div className="absolute inset-0 bg-gray-300/35 rounded-full" />
              <div className="absolute inset-0 bg-gray-300/30 blur-lg rounded-full" />
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mb-6" style={{ paddingBottom: "56.25%" }}>
      <video
        className="absolute top-0 left-0 w-full h-full"
        controls
        autoPlay
        onError={(e) => {
          console.error("Video playback error:", e);
          setError("Failed to load video. Please try again.");
        }}
        onLoadStart={() => console.log("Video load started")}
        onCanPlay={() => console.log("Video can play")}
      >
        <source src={videoSignedUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
