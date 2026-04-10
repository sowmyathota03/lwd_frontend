import axiosInstance from "./axiosInstance";

export const uploadResume = async (file, makeDefault = true) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("makeDefault", makeDefault);

  const response = await axiosInstance.post("/resumes/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyResumes = async () => {
  const response = await axiosInstance.get("/resumes/my");
  return response.data;
};

export const setDefaultResume = async (resumeId) => {
  const response = await axiosInstance.put(`/resumes/${resumeId}/default`);
  return response.data;
};

export const deleteResume = async (resumeId) => {
  const response = await axiosInstance.delete(`/resumes/${resumeId}`);
  return response.data;
};



export const viewResume = async (resumeId) => {
  const response = await axiosInstance.get(`/resumes/${resumeId}/view`,);
  return response.data;
};