import axios from "axios";
import { api } from "../api/index";

export const signinUser = (email, password) => {
  return api
    .post("/users/login/", {
      email,
      password,
    })
    .then((response) => {
      // 서버로부터 받은 JWT 토큰을 로컬 스토리지에 저장
      const { access_token, refresh_token } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      console.log("로그인 성공:", response.data);
      return response.data;
    })
    .catch((error) => {
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
    });
};
