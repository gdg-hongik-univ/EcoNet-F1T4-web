import axios from "axios";
import { api } from "../api/index";

/**
 * 모임 정보를 서버에 전송하는 함수
 * @param {Object} data - 폼에서 입력받은 모임 정보
 * @returns {Promise} - 서버의 응답을 포함하는 Promise
 */

export const postMake = (data) => {
  const accessToken = localStorage.getItem("access_token"); // 저장된 토큰 가져오기

  return api
    .post("/boards/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 포함
      },
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw new Error(
          error.response?.data?.message ||
            "모임 등록 실패: 서버와의 통신에 문제가 발생했습니다."
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Unexpected error occurred during board creation.");
      }
    });
};
