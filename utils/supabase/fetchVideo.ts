import { createClient } from "./client";

const supabase = createClient();

export const fetchVideoUrl = async (
  videoUrl: string
): Promise<string | null> => {
  try {
    if (!videoUrl) {
      console.error("No video URL provided");
      return null;
    }

    const filePath = videoUrl.split("courses-resources/")[1];
    if (!filePath) {
      console.error("Invalid video URL format:", videoUrl);
      return null;
    }

    const { data, error } = await supabase.storage
      .from("courses-resources")
      .createSignedUrl(filePath, 3600);

    if (error || !data) {
      console.error("Error creating signed URL for video:", error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error("Unexpected error fetching video signed URL:", error);
    return null;
  }
};
