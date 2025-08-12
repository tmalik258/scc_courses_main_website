"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface SidebarTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  courseId: string;
  onFilesFetched: (files: { name: string; signedUrl: string }[]) => void;
  hasResources: boolean;
  isPaid: boolean;
}

export function SidebarTabs({
  activeTab,
  onTabChange,
  courseId,
  onFilesFetched,
  hasResources,
  isPaid,
}: SidebarTabsProps) {
  const supabase = createClient();

  useEffect(() => {
    console.log(
      "SidebarTabs useEffect triggered, activeTab:",
      activeTab,
      "courseId:",
      courseId
    );
    const fetchFiles = async () => {
      if (!isPaid) {
        onFilesFetched([]);
        return;
      }

      console.log("Fetching resources for courseId:", courseId);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log("Supabase user:", user);
      if (userError) console.error("Auth error:", userError);

      const { data: resources, error } = await supabase
        .from("resources")
        .select("name, url")
        .eq("course_id", courseId);
      console.log("Resources fetched:", resources, "Error:", error);

      if (error) {
        console.error("Error fetching resources:", error);
        onFilesFetched([]);
        return;
      }

      if (!resources || resources.length === 0) {
        console.warn("No resources found for course:", courseId);
        onFilesFetched([]);
        return;
      }

      const signedFiles = await Promise.all(
        resources.map(async (resource) => {
          const path = resource.url;
          console.log("Generating signed URL for path:", path);
          const { data: signed, error: urlError } = await supabase.storage
            .from("course-files")
            .createSignedUrl(path, 60 * 60);

          if (urlError || !signed?.signedUrl) {
            console.error(`Failed to sign ${path}:`, urlError);
            return null;
          }

          return {
            name: resource.name,
            signedUrl: signed.signedUrl,
          };
        })
      );

      const validFiles = signedFiles.filter(
        (file): file is { name: string; signedUrl: string } => !!file?.signedUrl
      );
      console.log("Fetched signed files:", validFiles);
      onFilesFetched(validFiles);
    };

    if (activeTab === "files") {
      fetchFiles();
    }
  }, [activeTab, courseId, onFilesFetched, isPaid]);

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-6">
        <button
          onClick={() => onTabChange("lessons")}
          className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "lessons"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Course Lessons
        </button>
        {hasResources && (
          <button
            onClick={() => onTabChange("files")}
            disabled={!isPaid}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "files"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            } ${!isPaid ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Files
          </button>
        )}
      </div>
    </div>
  );
}
