import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
