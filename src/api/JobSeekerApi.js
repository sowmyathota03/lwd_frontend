import axiosInstance from "./axiosInstance";

// ===============================
// JOB SEEKER APIs
// ===============================

// Create or Update Profile
export const createOrUpdateProfile = (data) => {
  return axiosInstance.post("/job-seekers/profile", data);
};

// Get Logged-in Job Seeker Profile
export const getJobSeekerProfile = () => {
  return axiosInstance.get("/job-seekers/me");
};


// Get Job Seeker Profile by User ID (for recruiters/admins)  
export const getJobSeekerByUserId = (userId) => { 
  return axiosInstance.get(`/job-seekers/user/${userId}`);
} 


// ===============================
// 🔹 Get My Skills
// ===============================
export const getMySkills = () =>
  axiosInstance.get("/job-seekers/myskills");



// ===============================
// 🔹 Get Skills By UserId
// ===============================
export const getSkillsById = (userId) =>
  axiosInstance.get(`/job-seekers/skills/${userId}`);

// ===============================
// 🔹 Update My Skills
// ===============================
export const updateMySkills = (skills) =>
  axiosInstance.put("/job-seekers/updateskills", {
    skills,
  });

// ===============================
// 🔹 Get All Skills (Pagination + Search)
// ===============================
export const getAllSkills = (params) =>
  axiosInstance.get("/job-seekers/skills", {
    params,
  });

// ===============================
// RECRUITER APIs
// ===============================

export const searchJobSeekers = (searchRequest) =>
  axiosInstance.post("/job-seekers/search", searchRequest);

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
