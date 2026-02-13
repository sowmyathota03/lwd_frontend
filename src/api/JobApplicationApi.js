import api from "./axiosInstance"; 

// ================= APPLY FOR JOB =================
export const applyForJob = (jobApplicationData) => {
  // jobApplicationData should match JobApplicationRequest DTO
  return api.post("/job-applications/apply", jobApplicationData);
};

// ================= GET MY JOB APPLICATIONS =================
export const getMyApplications = (page = 0, size = 10) => {
  return api.get("/job-applications/my", {
    params: { page, size },
  });
};
