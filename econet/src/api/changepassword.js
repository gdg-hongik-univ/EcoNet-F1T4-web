import { api } from ".";

export const changePassword = async (oldPassword, newPassword) => {
  const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 토큰 가져오기
  if (!accessToken) {
    throw new Error("인증 토큰이 없습니다.");
  }

  try {
    const response = await api.patch(
      "/users/change_password/",
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 포함
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(JSON.stringify(error.response.data)); // 에러 메시지를 JSON 문자열로 변환하여 던짐
    }
    throw new Error("비밀번호 변경에 실패했습니다.");
  }
};
