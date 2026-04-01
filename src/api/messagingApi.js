/**
 * Messaging API Service
 * 
 * This service handles HTTP requests related to the messaging system.
 * It will eventually connect to the backend for persistent chat data.
 */

// mock data for now
export const getConversations = async () => {
    // return Promise.resolve([]);
    return [];
};

export const getMessages = async (conversationId) => {
    // return Promise.resolve([]);
    return [];
};

export const sendMessage = async (conversationId, message) => {
    // return Promise.resolve({ success: true });
    return { success: true };
};
