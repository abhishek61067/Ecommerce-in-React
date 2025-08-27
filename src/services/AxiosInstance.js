import axios from "axios";
// const VITE_API_BASE_URL= 'https://dummyjson.com/';
export const AxiosInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
