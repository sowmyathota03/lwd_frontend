import axiosInstance from "./axiosInstance";

/**
 * Fetch paginated notifications for logged-in user
 * GET /api/notifications?page=0&size=10
 */
export const getMyNotifications = async (page = 0, size = 10) => {
  const response = await axiosInstance.get("/notifications", {
    params: { page, size },
  });
  return response.data;
};

/**
 * Fetch unread notification count
 * GET /api/notifications/unread-count
 */
export const getUnreadNotificationCount = async () => {
  const response = await axiosInstance.get("/notifications/unread-count");
  return response.data;
};

/**
 * Mark one notification as read
 * PUT /api/notifications/{notificationId}/read
 */
export const markNotificationAsRead = async (notificationId) => {
  const response = await axiosInstance.put(
    `/notifications/${notificationId}/read`
  );
  return response.data;
};

/**
 * Mark all notifications as read
 * PUT /api/notifications/read-all
 */
export const markAllNotificationsAsRead = async () => {
  const response = await axiosInstance.put("/notifications/read-all");
  return response.data;
};

/**
 * Delete one notification
 * DELETE /api/notifications/{notificationId}
 */
export const deleteNotification = async (notificationId) => {
  const response = await axiosInstance.delete(`/notifications/${notificationId}`);
  return response.data;
};