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

/* ========================= */
/* ===== LOGIN API ===== */
/* ========================= */

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);

  const { token, refreshToken } = res.data || {};

  if (!token) {
    throw new Error("Login failed: token not received");
  }

  // ✅ Store tokens
  localStorage.setItem("token", token);

  // (Optional - recommended if using refresh tokens)
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  return res.data;
};

/* ========================= */
/* ===== LOGOUT API ===== */
/* ========================= */

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    // ✅ Call backend logout (if implemented)
    if (refreshToken) {
      await axiosInstance.post("/auth/logout", { refreshToken });
    }
  } catch (error) {
    console.warn("Logout API failed (safe to ignore):", error?.message);
  } finally {
    // ✅ Always clear frontend session
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};