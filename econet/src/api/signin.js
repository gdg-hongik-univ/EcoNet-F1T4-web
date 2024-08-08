import axios from "axios";
import { api } from "../api/index";

/**
 * 로그인 함수
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호
 * @returns {Promise<Object>} - 로그인 성공 시 사용자 정보
 */
export const signinUser = async (email, password) => {
  try {
    const response = await api.post("/users/login/", { email, password });
    const {
      access_token,
      refresh_token,
      id: user_id,
      email: user_email,
    } = response.data;

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    console.log("로그인 성공:", response.data);

    // 로그인 성공 후 사용자 정보 반환
    return { id: user_id, email: user_email };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        error.response?.data?.message ||
          "로그인 실패: 이메일 또는 비밀번호를 확인하세요."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during login.");
    }
  }
};
