import api from "./axiosInstance";

// ================= GET COMPANY (Logged-in Recruiter) =================
export const getMyCompanyDetails = () => {
    return api.get("/companies/my").then((res) => res.data);
};

// ================= GET COMPANY BY USER ID =================
export const getCompanyDetailsByUserId = (userId) => {
    return api.get(`/companies/user/${userId}`).then((res) => res.data);
};

// ================= CREATE COMPANY =================
export const createCompanyDetails = (data) => {
    return api.post("/companies", data).then((res) => res.data);
};

// ================= UPDATE COMPANY =================
export const updateCompanyDetails = (companyId, data) => {
    return api.put(`/companies/${companyId}`, data).then((res) => res.data);
};