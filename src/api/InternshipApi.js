import axiosInstance from "./axiosInstance";

/* ================= CREATE INTERNSHIP ================= */

export const createInternship = async (internshipData) => {
  const response = await axiosInstance.post(
    "/internships",
    internshipData
  );
  return response.data;
};


/* ================= GET MY INTERNSHIPS ================= */

export const getMyInternships = async () => {
  const response = await axiosInstance.get("/internships/me");
  return response.data;
};


/* ================= GET INTERNSHIPS BY USER ID ================= */

export const getInternshipsByUserId = async (userId) => {
  const response = await axiosInstance.get(`/internships/user/${userId}`);
  return response.data;
};


/* ================= UPDATE INTERNSHIP ================= */

export const updateInternship = async (internshipId, internshipData) => {
  const response = await axiosInstance.put(
    `/internships/${internshipId}`,
    internshipData
  );
  return response.data;
};


/* ================= DELETE INTERNSHIP ================= */

export const deleteInternship = async (internshipId) => {
  const response = await axiosInstance.delete(`/internships/${internshipId}`);
  return response.data;
};