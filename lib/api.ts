import axios from "axios";

const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL_SERVER
      : process.env.NEXT_PUBLIC_API_URL_CLIENT,
});

export default api;
