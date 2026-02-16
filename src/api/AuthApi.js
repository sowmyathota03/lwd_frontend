import axiosInstance from "./axiosInstance";

export const registerJobSeeker = async (registerData) => {
  const response = await axiosInstance.post(
    "/auth/register/jobseeker",
    registerData
  );
  return response.data;
};

export const registerRecruiter = async (registerData) => {
  const response = await axiosInstance.post(
    "/auth/register/recruiter",
    registerData
  );
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    loginData
  );

  // store token automatically
  localStorage.setItem("token", response.data.token);

  return response.data;
};
