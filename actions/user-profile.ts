import axios from "axios";

export async function getUserProfile() {
  try {
    const response = await axios.post('/api/user-profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
