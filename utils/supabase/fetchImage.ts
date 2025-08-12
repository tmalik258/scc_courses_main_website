import { createClient } from "./client";

const supabase = createClient();

export const fetchImage = async (
  fileName: string,
  bucketName: string
): Promise<string | null> => {
  try {
    if (!fileName || !bucketName) {
      console.error("File name or bucket name not provided");
      return null;
    }

    console.log(
      "Fetching signed URL for file:",
      fileName,
      "from bucket:",
      bucketName
    );

    // Generate signed URL for the image
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(
        fileName.startsWith("images/") ? fileName : `images/${fileName}`,
        3600
      );

    if (error) {
      console.error("Error generating signed URL:", error);
      return null;
    }

    const uploadedUrl = data.signedUrl;
    console.log("Signed URL:", uploadedUrl);

    return uploadedUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
