import axiosInstance from "./axiosInstance";

/* ================= CREATE PROJECT ================= */
export const createProject = async (projectData) => {
  const res = await axiosInstance.post("/projects", projectData);
  return res.data;
};

/* ================= GET MY PROJECTS ================= */
export const getMyProjects = async () => {
  const res = await axiosInstance.get("/projects/me");
  return res.data;
};

/* ================= GET PROJECTS BY USER ID ================= */
export const getProjectsByUserId = async (userId) => {
  const res = await axiosInstance.get(`/projects/user/${userId}`);
  return res.data;
};

/* ================= UPDATE PROJECT ================= */
export const updateProject = async (projectId, projectData) => {
  const res = await axiosInstance.put(`/projects/${projectId}`, projectData);
  return res.data;
};
