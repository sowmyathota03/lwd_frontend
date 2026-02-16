import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.14:8080/api",
  //  baseURL: "http://10.55.54.62:8080/api",
  // baseURL: "http://192.168.1.99:8080/api",
   baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Attach JWT Token Automatically
// ===============================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
