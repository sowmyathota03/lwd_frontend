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
  const response = await axiosInstance.post("/auth/login", loginData);

  localStorage.setItem("token", response.data.token);

  return response.data;
};

// ================= PASSWORD APIs =================

// forgot password
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post("/password/forgot", { email });
  return response.data;
};

// reset password
export const resetPassword = async (resetData) => {
  const response = await axiosInstance.post("/password/reset", resetData);
  return response.data;
};

// change password
export const changePassword = async (changeData) => {
  const response = await axiosInstance.post("/password/change", changeData);
  return response.data;
};