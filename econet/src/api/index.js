import axios from "axios";

export const api = axios.create({
  baseURL: "http://13.124.235.155:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
