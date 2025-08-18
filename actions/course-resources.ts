import axios from "axios";

export async function getCourseResources(courseId: string) {
  try {
    const response = await axios.get(`/api/resources?courseId=${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error loading course resources:", error);
    return [];
  }
}
