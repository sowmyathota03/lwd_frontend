import api from "./axiosInstance";

// ================= GET LOGGED-IN RECRUITER JOBS =================
export const getMyPostedJobs = () => {
    return api.get("/jobs/my").then((res) => res.data);
};

// ================= GET JOBS BY USER ID =================
export const getPostedJobsByUserId = (userId) => {
    return api.get(`/jobs/user/${userId}`).then((res) => res.data);
};