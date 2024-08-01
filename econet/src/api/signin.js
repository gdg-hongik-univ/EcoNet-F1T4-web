import axios from "axios";
import { api } from "../api/index";

export const signinUser = (email, password) => {
  api
    .post("/users/login/", {
      email,
      password,
    })
    .then((response) => {
      // 서버로부터 받은 JWT 토큰을 로컬 스토리지에 저장
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("로그인 성공:", response.data);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    });
};
