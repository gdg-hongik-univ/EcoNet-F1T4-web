import { api } from "../api/index";

export const getBins = async (category) => {
  try {
    const res = await api.get(`/maps/bins/?category=${category}`);
    return res.data.bins;
  } catch (e) {
    console.log(e.message);
    alert("에러가 발생했습니다");
  }
};
