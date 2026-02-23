// ./src/api/dashboardApi.js
import axiosInstance from "./axiosInstance";

export const fetchAdminDashboard = () => axiosInstance.get("/dashboard/admin");
export const fetchRecruiterAdminDashboard = () => axiosInstance.get("/dashboard/recruiter-admin");
export const fetchRecruiterDashboard = () => axiosInstance.get("/dashboard/recruiter");