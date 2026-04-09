// ./src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://lwd-backend-production-85cd.up.railway.app/api",

  // choose ONE baseURL (recommended for local dev)
  // baseURL: "http://localhost:8080/api",

  // 👉 If using mobile / same network, use this instead:
  baseURL: "http://192.168.1.8:8080/api",

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


// Attach JWT Token Automatically

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global Error Handling

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    if (status === 403) {
      console.error("Access denied.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;