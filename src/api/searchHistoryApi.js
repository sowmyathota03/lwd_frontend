// ./src/api/searchHistoryApi.js

import axiosInstance from "./axiosInstance";

// =====================================
// GET RECENT SEARCHES
// =====================================
export const getRecentSearches = async (limit = 3) => {
  const response = await axiosInstance.get("/search-history/recent", {
    params: { limit },
  });
  return response.data;
};

// =====================================
// DELETE SINGLE SEARCH HISTORY
// =====================================
export const deleteSearchHistory = async (id) => {
  const response = await axiosInstance.delete(`/search-history/${id}`);
  return response.data;
};

// =====================================
// CLEAR ALL SEARCH HISTORY
// =====================================
export const clearAllSearchHistory = async () => {
  const response = await axiosInstance.delete("/search-history/clear");
  return response.data;
};