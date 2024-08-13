import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.econet-us.site/",
  headers: {
    "Content-Type": "application/json",
  },
});
