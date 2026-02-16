import axiosInstance from "./axiosInstance";

// ================= USERS =================
export const getAllUsers = (page = 0, size = 20) =>
  axiosInstance
    .get("/admin/users", {
      params: { page, size },
    })
    .then((res) => res.data);

export const blockUser = (id) =>
  axiosInstance.patch(`/admin/users/${id}/block`).then((res) => res.data);

export const unblockUser = (id) =>
  axiosInstance.patch(`/admin/users/${id}/unblock`).then((res) => res.data);


// ================= RECRUITERS =================
export const getRecruitersByCompanyId = (
  companyId,
  page = 0,
  size = 20
) =>
  axiosInstance
    .get(`/admin/company/${companyId}/recruiters`, {
      params: { page, size },
    })
    .then((res) => res.data);


export const approveRecruiter = (id) =>
  axiosInstance
    .put(`/recruiter-admin/recruiters/${id}/approve`)
    .then((res) => res.data);

export const blockRecruiter = (id, block) =>
  axiosInstance
    .put(`/recruiter-admin/recruiters/${id}/block`, null, {
      params: { block },
    })
    .then((res) => res.data);


/// ================= COMPANIES =================
export const getAllCompanies = (page = 0, size = 20) =>
  axiosInstance
    .get("/admin/companies", {
      params: { page, size },
    })
    .then((res) => res.data);

export const blockCompany = (id) =>
  axiosInstance
    .patch(`/admin/companies/${id}/block`)
    .then((res) => res.data);

export const unblockCompany = (id) =>
  axiosInstance
    .patch(`/admin/companies/${id}/unblock`)
    .then((res) => res.data);


// ================= JOBS =================
export const getAllJobs = (page = 0, size = 20) =>
  axiosInstance
    .get("/admin/jobs", {
      params: { page, size },
    })
    .then((res) => res.data);

export const closeJob = (id) =>
  axiosInstance.patch(`/admin/jobs/${id}/close`).then((res) => res.data);

