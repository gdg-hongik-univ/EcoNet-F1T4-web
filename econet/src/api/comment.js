import axios from "axios";
import { api } from "./index";

/**
 * 댓글 작성 함수
 * @param {number|string} gatheringpost_id - 모임번호
 * @param {Object} commentData - 댓글 데이터
 * @param {string} commentData.user_id - 댓글 작성자 ID
 * @param {string} commentData.content - 댓글 내용
 * @returns {Promise<Object>} - 서버의 응답을 포함하는 Promise
 */
export const createComment = async (gatheringpost_id, commentData) => {
  try {
    const response = await api.post(
      `/boards/${gatheringpost_id}/comments/`,
      commentData
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        error.response?.data?.message ||
          "댓글 작성 실패: 서버와의 통신에 문제가 발생했습니다."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during creating comment.");
    }
  }
};
