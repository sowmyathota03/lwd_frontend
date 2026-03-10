import axiosInstance from "./axiosInstance";

/* ================= GLOBAL SEARCH ================= */

export const globalSearch = async (
  keyword = "",
  category = "jobs",
  page = 0,
  size = 20
) => {
  const res = await axiosInstance.get("/search", {
    params: {
      keyword,
      category,
      page,
      size,
    },
  });
  console.log("API Response:", res); 
  return res.data;

};


/* ================= SEARCH SUGGESTIONS ================= */

export const getSearchSuggestions = async (keyword) => {

  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const res = await axiosInstance.get("/search/suggestions", {
    params: { keyword },
  });

  return res.data;
};
