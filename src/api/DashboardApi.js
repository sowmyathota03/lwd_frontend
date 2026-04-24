// ./src/api/dashboardApi.js
import axiosInstance from "./axiosInstance";

export const fetchAdminDashboard = () => axiosInstance.get("/dashboard/admin");
export const fetchRecruiterAdminDashboard = () => axiosInstance.get("/dashboard/company-admin");
export const fetchRecruiterDashboard = () => axiosInstance.get("/dashboard/recruiter");