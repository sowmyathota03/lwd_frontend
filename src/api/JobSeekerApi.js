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

// ===============================
// BASIC PROFILE
// ===============================

export const getProfileCompletion = async () => {
  const res = await axiosInstance.get("/job-seekers/me/profile-completion");
  return res.data;
};


// ===============================
// ABOUT INFO
// ===============================

// Get logged-in user's about info
export const getMyAboutInfo = async () => {
  const response = await axiosInstance.get("/job-seekers/me/about");
  return response.data;
};

// Update logged-in user's about info
export const updateAboutInfo = async (data) => {
  const response = await axiosInstance.put("/job-seekers/me/about", data);
  return response.data;
};

// Get about info of another user
export const getAboutInfoByUserId = async (userId) => {
  const response = await axiosInstance.get(`/job-seekers/user/${userId}/about`);
  return response.data;
};


// ===============================
// SOCIAL LINKS
// ===============================

// Get logged-in user's social links
export const getMySocialLinks = async () => {
  const response = await axiosInstance.get("/job-seekers/me/social");
  return response.data;
};

// Update logged-in user's social links
export const updateSocialLinks = async (data) => {
  const response = await axiosInstance.put("/job-seekers/me/social", data);
  return response.data;
};

// Get social links of another user
export const getSocialLinksByUserId = async (userId) => {
  const response = await axiosInstance.get(`/job-seekers/user/${userId}/social`);
  return response.data;
};
