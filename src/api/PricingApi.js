// ./src/api/PricingApi.js

import axios from "./axiosInstance";

// ===============================
// 🔥 ADMIN PLAN APIs
// ===============================

// Create Plan
export const createPlan = async (data) => {
  const res = await axios.post("/admin/plans", data);
  return res.data;
};

// Update Plan
export const updatePlan = async (planId, data) => {
  const res = await axios.put(`/admin/plans/${planId}`, data);
  return res.data;
};

// Get All Plans
export const getAllPlans = async () => {
  const res = await axios.get("/admin/plans");
  return res.data;
};

// Enable / Disable Plan
export const togglePlan = async (planId, active) => {
  const res = await axios.patch(
    `/admin/plans/${planId}/toggle?active=${active}`
  );
  return res.data;
};



// ===============================
// 🔥 ADMIN PLAN FEATURE APIs
// ===============================

// Upsert Single Feature
export const upsertFeature = async (planId, data) => {
  const res = await axios.post(`/admin/plan-features/${planId}`, data);
  return res.data;
};

// Bulk Feature Update
export const upsertFeaturesBulk = async (planId, data) => {
  const res = await axios.post(
    `/admin/plan-features/${planId}/bulk`,
    data
  );
  return res.data;
};

// Get Plan Features
export const getPlanFeatures = async (planId) => {
  const res = await axios.get(`/admin/plan-features/${planId}/all`);
  console.log("Fetched Plan Features:", res.data);
  return res.data;
};



// ===============================
// 🔥 USER SUBSCRIPTION APIs
// ===============================

// Subscribe / Upgrade / Downgrade
export const subscribePlan = async (planId) => {
  const res = await axios.post(`/subscriptions/subscribe/${planId}`);
  return res.data;
};

// Get Current Subscription
export const getCurrentSubscription = async () => {
  const res = await axios.get("/subscriptions/current");
  return res.data;
};

// Cancel Subscription
export const cancelSubscription = async () => {
  const res = await axios.post("/subscriptions/cancel");
  return res.data;
};

// ===============================
// 🔥 PUBLIC / USER PLAN APIs
// ===============================

// Get Plans (auto role-based)
export const getPlans = async () => {
  const res = await axios.get("/plans");
  return res.data;
};

// Candidate Plans
export const getCandidatePlans = async () => {
  const res = await axios.get("/plans/candidate");
  console.log("Candidate Plans:", res.data);
  return res.data;
};

// Recruiter Plans
export const getRecruiterPlans = async () => {
  const res = await axios.get("/plans/recruiter");
  console.log("Recruiter Plans:", res.data);
  return res.data;
};
