import { api } from "../api/index";

export async function getDistricts() {
  try {
    const res = await api.get("/maps/districts");

    return res.data;
  } catch (e) {
    console.log(e.message);
    alert("에러가 발생했습니다");
  }
}
