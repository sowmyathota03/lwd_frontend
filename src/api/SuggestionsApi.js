import api from "./axiosInstance";

export const getAllJobs = () => {
  return api.get("/jobs/suggested");
};

export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};
