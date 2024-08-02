import axios from "axios";
import { api } from "../api/index";

// export const signupUser = (email, password, nickname) => {
//   return api
//     .post("/users/signup/", {
//       email,
//       password,
//       nickname,
//     })
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       if (axios.isAxiosError(error)) {
//         console.error("Axios error:", error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     });
// };

export const signupUser = async (email, password, nickname) => {
  try {
    const response = await api.post("/users/signup/", {
      email,
      password,
      nickname,
    });
    console.log("회원가입 성공:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error; // 에러를 호출한 곳으로 전달
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred during signup.");
    }
  }
};
