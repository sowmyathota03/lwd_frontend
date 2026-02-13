
import api from "./axiosInstance";


export const getAllCompanies = () => {
  return api.get("/companies");
};


export const getCompanyById = (companyId) => {
  return api.get(`/companies/${companyId}`);
};
