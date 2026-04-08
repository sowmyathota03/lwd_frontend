import axiosInstance from "./axiosInstance";

// ================= SUMMARY =================
export const fetchAdminSummary = () =>
  axiosInstance.get("/admin/dashboard/summary");

// ================= GROWTH =================
export const fetchAdminGrowth = () =>
  axiosInstance.get("/admin/dashboard/growth");

// ================= RECENT DATA =================
export const fetchRecentUsers = (size = 5) =>
  axiosInstance.get(`/admin/dashboard/recent-users?size=${size}`);

export const fetchRecentJobs = (size = 5) =>
  axiosInstance.get(`/admin/dashboard/recent-jobs?size=${size}`);

export const fetchRecentApplications = (size = 5) =>
  axiosInstance.get(`/admin/dashboard/recent-applications?size=${size}`);

// ================= CHARTS =================
export const fetchJobsPerIndustry = () =>
  axiosInstance.get("/admin/dashboard/charts/jobs-per-industry");

export const fetchApplicationsTrend = () =>
  axiosInstance.get("/admin/dashboard/charts/applications-trend");

export const fetchUsersByRole = () =>
  axiosInstance.get("/admin/dashboard/charts/users-by-role");

// ================= SYSTEM HEALTH =================
export const fetchSystemHealth = () =>
  axiosInstance.get("/admin/dashboard/system-health");