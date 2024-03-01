import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
});

export default axiosInstance;

export const axiosInstance2 = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const imgBaseURL = "http://localhost:5000/api/v1/users";
