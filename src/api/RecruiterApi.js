import axiosInstance from "./axiosInstance";

// ===============================
// RECRUITER APIs
// ===============================

// Create or Update Recruiter Profile
export const createOrUpdateRecruiterProfile = (data) => {
  return axiosInstance.post("/recruiter/profile", data);
};

// Get Logged-in Recruiter Profile
export const getRecruiterProfile = () => {
  return axiosInstance.get("/recruiter/me");
};

// Get Recruiter Profile by User ID (for admin or company)
export const getRecruiterByUserId = (userId) => {
  return axiosInstance.get(`/recruiter/user/${userId}`);
};



// ================= GET JOBS POSTED BY LOGGED-IN RECRUITER =================
export const getMyRecruiterJobs = () =>
  axiosInstance
    .get("/recruiter/jobs")
    .then((res) => res.data);


// ================= REQUEST COMPANY ACCESS =================
export const requestCompanyApproval = (companyId) =>
  axiosInstance
    .post(`/recruiter/request-company/${companyId}`)
    .then((res) => res.data);


// ================= GET APPLICATIONS FOR A JOB =================
export const getApplicationsForJob = (
  jobId,
  page = 0,
  size = 10
) =>
  axiosInstance
    .get(`/recruiter/jobs/${jobId}/applications?page=${page}&size=${size}`)
    .then((res) => res.data);
