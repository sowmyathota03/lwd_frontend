
import axiosInstance from "./axiosInstance"; 

// ================= APPLY FOR JOB =================
export const applyForJob = (jobApplicationData) => {
  // jobApplicationData should match JobApplicationRequest DTO
  return axiosInstance.post("/job-applications/apply", jobApplicationData);
};

// ================= GET MY JOB APPLICATIONS =================
export const getMyApplications = (page = 0, size = 10) => {
  return axiosInstance.get("/job-applications/my", {
    params: { page, size },
  });
};


/* ==================================================
   ADMIN APIs
================================================== */

// ADMIN → applications by job
export const getApplicationsByJobAdmin = (jobId, page = 0, size = 10) =>
  axiosInstance
    .get(`/job-applications/admin/job/${jobId}`, {
      params: { page, size },
    })
    .then((res) => res.data);

/* ==================================================
   COMPANY (RECRUITER_ADMIN / RECRUITER)
================================================== */

// Applications by job (company scope)
export const getApplicationsByJobCompany = (jobId, page = 0, size = 10) =>
  axiosInstance
    .get(`/job-applications/company/job/${jobId}`, {
      params: { page, size },
    })
    .then((res) => res.data);

// All applications of my company
export const getMyCompanyApplications = (page = 0, size = 10) =>
  axiosInstance
    .get("/job-applications/company", {
      params: { page, size },
    })
    .then((res) => res.data);

/* ==================================================
   ROLE-BASED (ADMIN / RECRUITER_ADMIN / RECRUITER)
================================================== */

// ADMIN → all applications
// RECRUITER_ADMIN → own company applications
// RECRUITER → only own created job applications
export const getApplicationsByRole = (page = 0, size = 10) =>
  axiosInstance
    .get("/job-applications/my-applications", {
      params: { page, size },
    })
    .then((res) => res.data);

/* ==================================================
   JOB SEEKER
================================================== */

/* ==================================================
   CHANGE APPLICATION STATUS
================================================== */

export const changeApplicationStatus = (applicationId, status) =>
  axiosInstance.put(
    `/job-applications/${applicationId}/status`,
    null,
    { params: { status } }
  );

