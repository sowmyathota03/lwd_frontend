// ./src/api/messagingApi.js
import axiosInstance from "./axiosInstance";

// GET /api/v1/messaging/conversations?page=0&size=20
export const getConversations = async (page = 0, size = 20) => {
  const response = await axiosInstance.get("/v1/messaging/conversations", {
    params: { page, size },
  });
  return response.data;
};

export const getOrCreateConversation = async (otherUserId) => {
  const res = await axiosInstance.post(`/v1/messaging/conversations/direct/${otherUserId}`);
  return res.data;
};

// GET /api/v1/messaging/conversations/{conversationId}/messages?cursorId=&limit=20
export const getMessages = async (conversationId, cursorId = null, limit = 20) => {
  const response = await axiosInstance.get(
    `/v1/messaging/conversations/${conversationId}/messages`,
    {
      params: {
        limit,
        ...(cursorId ? { cursorId } : {}),
      },
    }
  );
  return response.data;
};

// POST /api/v1/messaging/conversations/{conversationId}/read
export const markConversationAsRead = async (conversationId) => {
  const response = await axiosInstance.post(
    `/v1/messaging/conversations/${conversationId}/read`
  );
  return response.data;
};

// DELETE /api/v1/messaging/conversations/{conversationId}/messages/{messageId}
export const deleteMessage = async (conversationId, messageId) => {
  const response = await axiosInstance.delete(
    `/v1/messaging/conversations/${conversationId}/messages/${messageId}`
  );
  return response.data;
};

// DELETE /api/v1/messaging/messages/bulk
export const deleteSelectedMessages = async (conversationId, messageIds) => {
  const response = await axiosInstance.delete(`/v1/messaging/messages/bulk`, {
    data: {
      conversationId,
      messageIds,
    },
  });
  return response.data;
};