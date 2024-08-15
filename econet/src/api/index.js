import axios from "axios";

export const api = axios.create({
  baseURL: "https://econet-us.site/",
  headers: {
    "Content-Type": "application/json",
  },
});
