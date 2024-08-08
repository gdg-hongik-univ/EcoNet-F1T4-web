import axios from "axios";
import { api } from "./index";

/**
 * 모임 정보를 서버에서 가져오는 함수
 * @param {number|string} id - 모임의 고유 ID
 * @returns {Promise} - 서버의 응답을 포함하는 Promise
 */
export const getIdDetail = (id) => {
  return api
    .get(`/boards/${id}/`) // URL 경로에 ID를 직접 삽입
    .then((response) => {
      return response.data; // 서버 응답 데이터를 반환
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw new Error(
          error.response?.data?.message ||
            "모임 상세 정보 조회 가져오기 실패: 서버와의 통신에 문제가 발생했습니다."
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Unexpected error occurred during fetching boards.");
      }
    });
};
