import axios from "axios";
import { api } from "../api/index";

export const signupUser = (email, password, nickname) => {
  api
    .post("/users/signup/", {
      email,
      password,
      nickname,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    });
};
