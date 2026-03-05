import axiosInstance from "./axiosInstance";

/* ================= GET MY EXPERIENCE ================= */

export const getMyExperience = async () => {
  const response = await axiosInstance.get("/experience/me");
  return response.data;
};

/* ================= GET EXPERIENCE BY ID ================= */

export const getExperienceByUserId = async (userId) => {
  const response = await axiosInstance.get(`/experience/user/${userId}`);
  return response.data;
};


/* ================= CREATE EXPERIENCE ================= */

export const createExperience = async (data) => {
  const response = await axiosInstance.post("/experience", data);
  return response.data;
};

/* ================= UPDATE EXPERIENCE ================= */

export const updateExperience = async (experienceId, data) => {
  const response = await axiosInstance.put(`/experience/${experienceId}`, data);
  return response.data;
};

/* ================= DELETE EXPERIENCE (OPTIONAL) ================= */

export const deleteExperience = async (experienceId) => {
  const response = await axiosInstance.delete(`/experience/${experienceId}`);
  return response.data;
};
