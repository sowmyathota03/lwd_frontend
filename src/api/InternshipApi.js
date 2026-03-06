import axiosInstance from "./axiosInstance";

/* ================= CREATE INTERNSHIP ================= */
export const createInternship = async (internshipData) => {
  const res = await axiosInstance.post("/internships", internshipData);
  return res.data;
};

/* ================= GET MY INTERNSHIPS ================= */
export const getMyInternships = async () => {
  const res = await axiosInstance.get("/internships/me");
  return res.data;
};

/* ================= GET INTERNSHIPS BY USER ID ================= */
export const getInternshipsByUserId = async (userId) => {
  const res = await axiosInstance.get(`/internships/user/${userId}`);
  return res.data;
};

/* ================= UPDATE INTERNSHIP ================= */
export const updateInternship = async (internshipId, internshipData) => {
  const res = await axiosInstance.put(`/internships/${internshipId}`, internshipData);
  return res.data;
};
