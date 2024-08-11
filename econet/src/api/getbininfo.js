import axios from "axios";
import { api } from "./index";

export const getBinInfo = (bin_id) => {
  return api
    .get(`/maps/${bin_id}/`) // URL 경로에 bin_id를 직접 삽입
    .then((response) => {
      return response.data; // 서버 응답 데이터를 반환
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw new Error(
          error.response?.data?.message ||
            "의류수거함 상세 정보 조회 가져오기 실패: 서버와의 통신에 문제가 발생했습니다."
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error(
          "의류수거함 정보를 가져오는 중 예기치 않은 오류가 발생했습니다."
        );
      }
    });
};
