import axiosInstance from "./axiosInstance";

/* ================= CREATE CERTIFICATION ================= */
export const createCertification = async (certificationData) => {
  const res = await axiosInstance.post("/certifications", certificationData);
  return res.data;
};

/* ================= GET MY CERTIFICATIONS ================= */
export const getMyCertifications = async () => {
  const res = await axiosInstance.get("/certifications/me");
  return res.data;
};

/* ================= GET CERTIFICATIONS BY USER ID ================= */
export const getCertificationsByUserId = async (userId) => {
  const res = await axiosInstance.get(`/certifications/user/${userId}`);
  return res.data;
};

/* ================= UPDATE CERTIFICATION ================= */
export const updateCertification = async (certificationId, certificationData) => {
  const res = await axiosInstance.put(`/certifications/${certificationId}`, certificationData);
  return res.data;
};
