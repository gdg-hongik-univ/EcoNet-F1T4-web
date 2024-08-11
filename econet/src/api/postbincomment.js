import axios from "axios";
import { api } from "./index";

export const postBinComment = async (bin_id, commentContent) => {
  const accessToken = localStorage.getItem("access_token"); // 저장된 토큰 가져오기
  try {
    const response = await api.post(
      `/maps/${bin_id}/info_upload/`,
      {
        content: commentContent,
        bin: bin_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 포함
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        error.response?.data?.message ||
          "bininfo 댓글 작성 실패: 서버와의 통신에 문제가 발생했습니다."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during creating comment.");
    }
  }
};
