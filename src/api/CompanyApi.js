
import axiosInstance from "./axiosInstance";


// CompanyApi.js
export const getAllCompanies = (page = 0, size = 5) => {
  return axiosInstance.get(`/companies?page=${page}&size=${size}`);
};


export const getCompanyById = async (companyId) => {
  const response = await axiosInstance.get(`/companies/${companyId}`);
  return response.data;
};



// 🔹 Create company (ADMIN, RECRUITER_ADMIN)
export const createCompany = (companyData) =>
  axiosInstance.post("/", companyData).then((res) => res.data);

// 🔹 Update company by company ID
export const updateCompany = (id, companyData) =>
  axiosInstance.put(`/companies/${id}`, companyData).then((res) => res.data);

// 🔹 Delete company (Soft delete)
export const deleteCompany = (id) =>
  axiosInstance.delete(`/companies/${id}`).then((res) => res.data);

// 🔹 Get company created by logged-in user
export const getMyCompany = () =>
  axiosInstance.get("/companies/my-company").then((res) => res.data);

// 🔹 Get company by creator user ID (Admin use)
export const getCompanyByCreatedByUserId = (userId) =>
  axiosInstance.get(`/companies/created-by/${userId}`).then((res) => res.data);

// 🔹 Get company analytics by company ID (Admin / Recruiter Admin)
export const getCompanyAnalytics = async (companyId) => {
  const response = await axiosInstance.get(
    `/companies/${companyId}/analytics`
  );
  return response.data;
};

