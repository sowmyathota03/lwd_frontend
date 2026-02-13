import api from "./axiosInstance";

export const getCompanyById = (companyId) => {
  return api.get(`/companies/${companyId}`);
};
