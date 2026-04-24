import axiosInstance from "./axiosInstance";

// ================= USERS =================
export const getAllUsers = (page = 0, size = 20) =>
  axiosInstance
    .get("/admin/users", {
      params: { page, size },
    })
    .then((res) => res.data);

export const searchUsers = async (filters = {}, page = 0, size = 20) => {
  const response = await axiosInstance.post("/admin/users/search", filters, {
    params: { page, size },
  });
  return response.data;
};

// Generic status update
export const updateUserStatus = async (id, status) => {
  const res = await axiosInstance.patch(`/admin/users/${id}/status`, {
    status,
  });
  return res.data;
};

// Reject user
export const rejectUser = async (id) => {
  const res = await axiosInstance.patch(`/admin/users/${id}/reject`);
  return res.data;
};

// ================= RECRUITERS =================
export const getRecruitersByCompanyId = (companyId, page = 0, size = 20) =>
  axiosInstance
    .get(`/admin/company/${companyId}/recruiters`, {
      params: { page, size },
    })
    .then((res) => res.data);


/// ================= COMPANIES =================
export const getAllCompanies = (page = 0, size = 20) =>
  axiosInstance
    .get("/admin/companies", {
      params: { page, size },
    })
    .then((res) => res.data);

// ================= JOBS =================
export const getAllJobs = (page = 0, size = 20) =>
  axiosInstance
    .get("/admin/jobs", {
      params: { page, size },
    })
    .then((res) => res.data);

export const updateCompanyStatus = (id, status) =>
  axiosInstance.patch(`/admin/companies/${id}/status`, null, {
    params: { status },
  }).then((res) => res.data);

export const closeJob = (id) =>
  axiosInstance.patch(`/admin/jobs/${id}/close`).then((res) => res.data);
