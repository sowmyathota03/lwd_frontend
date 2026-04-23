export const getApiErrorMessage = (err, fallback = "Something went wrong.") => {
  if (err?.code === "ERR_NETWORK") {
    return "Server is unavailable. Please try again later.";
  }

  const data = err?.response?.data;

  if (typeof data === "string") return data;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;
  if (typeof data?.details === "string") return data.details;

  return err?.message || fallback;
};