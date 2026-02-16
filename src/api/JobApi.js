import api from "./axiosInstance";

// Base URL is already /api

// CREATE JOB (ADMIN)
export const createJobAsAdmin = (companyId, jobData) => {
  return api.post(`/jobs/admin/company/${companyId}`, jobData);
};

// CREATE JOB (RECRUITER)
export const createJobAsRecruiter = (jobData) => {
  return api.post(`/jobs/create`, jobData);
};

// UPDATE JOB
export const updateJob = (jobId, jobData) => {
  return api.put(`/jobs/${jobId}`, jobData);
};

// DELETE JOB
export const deleteJob = (jobId) => {
  return api.delete(`/jobs/${jobId}`);
};

// CHANGE STATUS
export const changeJobStatus = (jobId, status) => {
  return api.patch(`/jobs/${jobId}/status`, null, {
    params: { status },
  });
};

// GET ALL JOBS
export const getAllJobs = (page = 0, size = 6) => {
  return api.get("/jobs", { params: { page, size } });
};

// GET TOP CATEGORIES
export const getTopCategories = (limit = 6) => {
  return api.get("/jobs/top-categories", {
    params: { limit },
  });
};

export const getSearchSuggestions = (keyword) => {
  return api.get("/jobs/suggestions", {
    params: { keyword },
  });
};


// GET JOBS BY INDUSTRY
export const getJobsByIndustry = (industry, page = 0, size = 6) => {
  return api.get("/jobs/industry", {
    params: { industry, page, size },
  });
};

// SEARCH JOBS
export const searchJobs = (params) => {
  return api.get(`/jobs/search`, { params });
};

// GET JOB BY ID
export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

export const getJobsByCompany = (companyId, page = 0) => {
  return api.get(`/jobs/company/${companyId}?page=${page}`);
};


// FILTER JOBS
export const filterJobs = (params) => {
  return api.get(`/jobs/filter`, { params });
};

// TRENDING JOBS
export const getTrendingJobs = () => {
  return api.get(`/jobs/trending`);
};

// ===============================
// GET MY JOBS (ADMIN / RECRUITER_ADMIN / RECRUITER)
// ===============================
export const getMyJobs = async (page = 0) => {
  const response = await api.get("/jobs/my-jobs", {
    params: { page },
  });

  return response.data; // ✅ return only data
};

