import axiosInstance from "./axiosInstance";

const BASE_PATH = "/plan/features";

// ➕ Create a new feature
export const createFeature = (data) =>
  axiosInstance.post(BASE_PATH, data).then((res) => res.data);

// ✏️ Update a feature by ID
export const updateFeature = (id, data) =>
  axiosInstance.put(`${BASE_PATH}/${id}`, data).then((res) => res.data);

// ❌ Delete a feature by ID
export const deleteFeature = (id) =>
  axiosInstance.delete(`${BASE_PATH}/${id}`).then((res) => res.data);

// 📋 Get a single feature by ID
export const getFeature = (id) =>
  axiosInstance.get(`${BASE_PATH}/${id}`).then((res) => res.data);

// 📋 List all features dynamically from backend
export const getAllFeatures = () =>
  axiosInstance.get(BASE_PATH).then((res) => res.data);

// 📋 List features filtered by PlanType (JOB_SEEKER / RECRUITER)
export const getFeaturesByPlanType = (planType) =>
  axiosInstance.get(`${BASE_PATH}/type/${planType}`).then((res) => res.data);

// 🔹 Bulk update features for a plan
export const upsertFeaturesBulk = (planId, data) =>
  axiosInstance
    .post(`/admin/plan-features/${planId}/bulk`, data)
    .then((res) => res.data);
