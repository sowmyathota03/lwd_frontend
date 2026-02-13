import api from "./axiosInstance"


/**
 * ============================
 * USER APIs
 * ============================
 */

export const getMyProfile = () => {
  return api.get("/users/me");
};

/**
 * Update logged-in user's profile
 * PUT /api/users/update
 */
export const updateMyProfile = (data) => {
  return api.put("/users/update", data);
};

/**
 * Get user profile by userId (Admin / Public)
 * GET /api/users/{userId}
 */
export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};
