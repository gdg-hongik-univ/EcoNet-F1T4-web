import axios from "axios";

export const api = axios.create({
  baseURL: "https://13.124.235.155.nip.io",
  headers: {
    "Content-Type": "application/json",
  },
});
