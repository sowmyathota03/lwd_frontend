import axiosInstance from "./axiosInstance";

/* ================= CREATE PROJECT ================= */

export const createProject = async (projectData) => {
  const response = await axiosInstance.post(
    "/projects",
    projectData
  );
  return response.data;
};


/* ================= GET MY PROJECTS ================= */

export const getMyProjects = async () => {
  const response = await axiosInstance.get(
    "/projects/me"
  );
  return response.data;
};


/* ================= GET PROJECTS BY USER ID ================= */

export const getProjectsByUserId = async (userId) => {
  const response = await axiosInstance.get(
    `/projects/user/${userId}`
  );
  return response.data;
};


/* ================= UPDATE PROJECT ================= */

export const updateProject = async (projectId, projectData) => {
  const response = await axiosInstance.put(
    `/projects/${projectId}`,
    projectData
  );
  return response.data;
};


/* ================= DELETE PROJECT ================= */

export const deleteProject = async (projectId) => {
  const response = await axiosInstance.delete(
    `/projects/${projectId}`
  );
  return response.data;
};