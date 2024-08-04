import { api } from "../api/index";

// 유저 프로필정보 받아오는 함수
export const getProfile = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await api.get("/mypage", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("프로필 정보 받아오기 실패");
  }
};
