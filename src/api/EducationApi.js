import axiosInstance from "./axiosInstance";



/* ================= CREATE EDUCATION ================= */

export const createEducation = async (educationData) => {
  const res = await axiosInstance.post("/education", educationData);
  return res.data;
};

/* ================= GET MY EDUCATION ================= */

export const getMyEducation = async () => {
  const response = await axiosInstance.get("/education/me");
  return response.data;
};

/* ================= GET EDUCATION BY USER ID ================= */

export const getEducationByUserId = async (userId) => {
  const response = await axiosInstance.get(`/education/user/${userId}`);
  return response.data;
};

/* ================= UPDATE EDUCATION ================= */

export const updateEducation = async (educationId, educationData) => {
  const response = await axiosInstance.put(
    `/education/${educationId}`,
    educationData
  );
  return response.data;
};
