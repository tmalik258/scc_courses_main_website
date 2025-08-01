// utils/supabase/listFiles.ts
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const listCourseFilesWithSignedUrls = async (courseId: string) => {
  const { data: files, error } = await supabase.storage
    .from("course-files")
    .list("resources");

  if (error || !files) {
    console.error("Error listing course files:", error);
    return [];
  }

  const matchingFiles = files.filter((file) =>
    file.name.startsWith(`${courseId}-`)
  );

  const signedUrlsResult = await supabase.storage
    .from("course-files")
    .createSignedUrls(
      matchingFiles.map((file) => `resources/${file.name}`),
      60 * 60
    );

  return (
    signedUrlsResult.data?.map((file, i) => ({
      name: matchingFiles[i].name.replace(`${courseId}-`, ""),
      signedUrl: file.signedUrl,
    })) || []
  );
};
