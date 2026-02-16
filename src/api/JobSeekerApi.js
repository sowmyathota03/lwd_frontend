import axiosInstance from "./axiosInstance";

// ===============================
// JOB SEEKER APIs
// ===============================

// Create or Update Profile
export const createOrUpdateProfile = (data) => {
  return axiosInstance.post("/job-seekers/profile", data);
};

// Get Logged-in Job Seeker Profile
export const getMyProfile = () => {
  return axiosInstance.get("/job-seekers/me");
};

// ===============================
// RECRUITER APIs
// ===============================

export const getImmediateJoiners = () => {
  return axiosInstance.get("/job-seekers/immediate-joiners");
};

export const getByNoticeStatus = (status) => {
  return axiosInstance.get(`/job-seekers/notice-status?status=${status}`);
};

export const getLwdWithinDays = (days) => {
  return axiosInstance.get(`/job-seekers/lwd-within/${days}`);
};

export const searchByLocation = (location) => {
  return axiosInstance.get(`/job-seekers/search-by-location?location=${location}`);
};
