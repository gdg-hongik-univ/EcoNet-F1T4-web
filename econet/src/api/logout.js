import axios from "axios";
import { api } from "../api/index";

// 로그아웃 함수
export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  console.log("로그아웃 시도 중...");

  try {
    const response = await api.post(
      "/users/logout/",
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // 액세스 토큰 포함
        },
      } // 리프레시 토큰을 요청 본문에 포함
    );
    console.log("로그아웃 성공:", response.data);
    localStorage.clear(); // 모든 항목 제거

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.detail || "";
      const tokenMessages = error.response?.data?.messages || [];

      // 토큰 만료 또는 유효하지 않은 경우
      if (
        errorMessage ===
          "이 토큰은 모든 타입의 토큰에 대해 유효하지 않습니다" ||
        tokenMessages.some(
          (msg) =>
            msg.token_class === "AccessToken" &&
            msg.message === "유효하지 않거나 만료된 토큰입니다"
        )
      ) {
        // 토큰 만료 시 강제 로그아웃
        localStorage.clear();
        window.location.href = "/signin";
      } else {
        console.error("Axios error:", error.message);
        throw new Error(error.response?.data?.message || "로그아웃 실패");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during logout.");
    }
  }
};
