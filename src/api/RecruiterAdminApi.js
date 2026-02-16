import axiosInstance from "./axiosInstance";

const BASE_URL = "/recruiter-admin"; 
// Because axiosInstance already has: http://localhost:8080/api

// ================= RECRUITERS =================

// Get all recruiters
export const getAllRecruiters = async (page = 0, size = 10) => {
  const res = await axiosInstance.get(`${BASE_URL}/recruiters`, {
    params: { page, size },
  });
  return res.data;
};


// Get pending recruiters
export const getPendingRecruiters = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/recruiters/pending`);
  return res.data;
};

// Approve recruiter
export const approveRecruiter = async (recruiterId) => {
  const res = await axiosInstance.put(
    `${BASE_URL}/recruiters/${recruiterId}/approve`
  );
  return res.data;
};

// Block / Unblock recruiter
export const blockRecruiter = async (recruiterId, block = true) => {
  const res = await axiosInstance.put(
    `${BASE_URL}/recruiters/${recruiterId}/block`,
    null,
    {
      params: { block },
    }
  );
  return res.data;
};

// Get jobs by recruiter
export const getJobsByRecruiter = async (recruiterId) => {
  const res = await axiosInstance.get(
    `${BASE_URL}/recruiter/${recruiterId}/jobs`
  );
  return res.data;
};

// ================= COMPANY PROFILE =================

export const getCompanyProfile = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/company/profile`);
  return res.data;
};

export const updateCompanyProfile = async (companyData) => {
  const res = await axiosInstance.put(
    `${BASE_URL}/company/profile`,
    companyData
  );
  return res.data;
};

// ================= JOB APPLICATIONS =================

export const getAllJobApplications = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/applications`);
  return res.data;
};

export const getJobApplicationsByJob = async (jobId) => {
  const res = await axiosInstance.get(
    `${BASE_URL}/applications/job/${jobId}`
  );
  return res.data;
};

// ================= OWN JOBS =================

export const getOwnJobs = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/jobs`);
  return res.data;
};

export const createJob = async (jobData) => {
  const res = await axiosInstance.post(`${BASE_URL}/jobs`, jobData);
  return res.data;
};

export const updateJob = async (jobId, jobData) => {
  const res = await axiosInstance.put(
    `${BASE_URL}/jobs/${jobId}`,
    jobData
  );
  return res.data;
};

export const deleteJob = async (jobId) => {
  const res = await axiosInstance.delete(`${BASE_URL}/jobs/${jobId}`);
  return res.data;
};
