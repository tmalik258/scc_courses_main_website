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
    console.log("Input videoUrl:", videoUrl);
    const filePath = videoUrl.split("courses-resources/")[1] || videoUrl;
    console.log("Extracted filePath:", filePath);
    const { data, error } = await supabase.storage
      .from("courses-resources")
      .createSignedUrl(filePath, 3600);
    console.log("Signed URL data:", data, "Error:", error);
    if (error || !data) {
      console.error(
        "Error creating signed URL for video:",
        error?.message || "No data returned"
      );
      return null;
    }
    return data.signedUrl;
  } catch (error) {
    console.error("Unexpected error fetching video signed URL:", error);
    return null;
  }
};
