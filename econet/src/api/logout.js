import axios from "axios";
import { api } from "../api/index";

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await api.post(
      "/users/logout/",
      { refresh_token: refreshToken },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    console.log("로그아웃 성공:", response.data);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(error.response?.data?.message || "로그아웃 실패");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during logout.");
    }
  }
};
