import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const Instance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPotect = (token) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosInstance;
};

export default Instance;
