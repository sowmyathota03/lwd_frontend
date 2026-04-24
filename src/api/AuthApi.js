import axiosInstance from "./axiosInstance";

/* ========================= */
/* ===== REGISTER APIs ===== */
/* ========================= */

export const registerJobSeeker = async (data) => {
  const res = await axiosInstance.post("/auth/register/jobseeker", data);
  return res.data;
};

export const registerRecruiter = async (data) => {
  const res = await axiosInstance.post("/auth/register/recruiter", data);
  return res.data;
};

export const registerCompanyAdmin = async (data) => {
  const res = await axiosInstance.post("/auth/register/company-admin", data);
  return res.data;
};

// ================= EMAIL VERIFICATION =================

export const verifyEmail = async (data) => {
  const res = await axiosInstance.post("/email/verify", data);
  return res.data;
};

export const resendVerificationEmail = async (data) => {
  const res = await axiosInstance.post("/email/resend", data);
  return res.data;
};



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

/* ========================= */
/* ===== LOGIN API ===== */
/* ========================= */

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);

  const { accessToken, refreshToken } = res.data || {};

  if (!accessToken || !refreshToken) {
    throw new Error("Login failed: access token or refresh token not received");
  }

  return res.data;
};

/* ========================= */
/* ===== LOGOUT API ===== */
/* ========================= */

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      await axiosInstance.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.warn("Logout API failed (safe to ignore):", error?.message);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};