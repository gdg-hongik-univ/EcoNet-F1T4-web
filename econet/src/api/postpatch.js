import axios from "axios";
import { api } from "../api/index";

/**
 * 모임 정보를 서버에 업데이트하는 함수
 * @param {number} gatheringpost_id - 모임의 ID
 * @param {Object} data - 업데이트할 모임 정보
 * @returns {Promise} - 서버의 응답을 포함하는 Promise
 */
export const postUpdate = async (gatheringpost_id, data) => {
  const accessToken = localStorage.getItem("access_token"); // 저장된 토큰 가져오기

  if (!accessToken) {
    throw new Error("사용자 인증 토큰이 없습니다. 로그인 후 다시 시도하세요.");
  }

  try {
    const response = await api.patch(`/boards/${gatheringpost_id}/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 포함
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw new Error(
        error.response?.data?.message ||
          "모임 수정 실패: 서버와의 통신에 문제가 발생했습니다."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during board update.");
    }
  }
};
