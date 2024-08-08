import axios from "axios";
import { api } from "../api/index";

/**
 * 모임 정보를 서버에서 가져오는 함수
 * @returns {Promise} - 서버의 응답을 포함하는 Promise
 */

export const gatheringPosts = (page = 0, limit = 50) => {
  return api
    .get(`/boards/`, {
      params: { page, limit }, // 페이지와 한 페이지당 항목 수를 쿼리 파라미터로 추가
    })
    .then((response) => {
      return response.data; // 서버 응답 데이터를 반환
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw new Error(
          error.response?.data?.message ||
            "모임 목록 가져오기 실패: 서버와의 통신에 문제가 발생했습니다."
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Unexpected error occurred during fetching boards.");
      }
    });
};
