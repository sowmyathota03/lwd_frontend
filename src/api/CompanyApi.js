
import axiosInstance from "./axiosInstance";


// CompanyApi.js
export const getAllCompanies = (page = 0, size = 5) => {
  return axiosInstance.get(`/companies?page=${page}&size=${size}`);
};


export const getCompanyById = (companyId) => {
  return axiosInstance.get(`/companies/${companyId}`);
};


// 🔹 Create company (ADMIN, RECRUITER_ADMIN)
export const createCompany = (companyData) =>
  axiosInstance.post("/", companyData).then((res) => res.data);

// 🔹 Update company by company ID
export const updateCompany = (id, companyData) =>
  axiosInstance.put(`/${id}`, companyData).then((res) => res.data);

// 🔹 Delete company (Soft delete)
export const deleteCompany = (id) =>
  axiosInstance.delete(`/${id}`).then((res) => res.data);

// 🔹 Get company created by logged-in user
export const getMyCompany = () =>
  axiosInstance.get("/companies/my-company").then((res) => res.data);

// 🔹 Get company by creator user ID (Admin use)
export const getCompanyByCreatedByUserId = (userId) =>
  axiosInstance.get(`/created-by/${userId}`).then((res) => res.data);
