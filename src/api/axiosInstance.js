import axios from "axios";
import { API_BASE_URL } from "../config/api";

const axiosInstance = axios.create({
  // baseURL: "https://lwd-backend-production-85cd.up.railway.app/api",


  // choose ONE baseURL (recommended for local dev)
  // baseURL: "http://localhost:8080/api",

  // 👉 If using mobile / same network, use this instead:
  // baseURL: "http://192.168.1.8:8080/api",

  baseURL: "https://lwd-backend.onrender.com/api",


  // baseURL: import.meta.env.VITE_API_BASE_URL,  
  // baseURL: "http://192.168.1.8:8080/api",



  // baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

const isAuthEndpoint = (url = "") => {
  return (
    url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/refresh") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password")
  );
};

const shouldForceLogout = (status, message = "") => {
  const normalized = String(message).toLowerCase();

  return (
    status === 403 ||
    normalized.includes("suspended") ||
    normalized.includes("blocked") ||
    normalized.includes("locked") ||
    normalized.includes("inactive") ||
    normalized.includes("disabled")
  );
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const requestUrl = originalRequest.url || "";
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "";

    if (isAuthEndpoint(requestUrl)) {
      return Promise.reject(error);
    }

    if (shouldForceLogout(status, message)) {
      handleLogout();
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        handleLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newAccessToken) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshClient.post("/auth/refresh", {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

function handleLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
}

export default axiosInstance;