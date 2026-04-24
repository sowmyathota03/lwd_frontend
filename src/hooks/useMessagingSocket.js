import { useCallback, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { API_BASE_URL, SOCKET_URL } from "../config/api";

export const useMessagingSocket = (userId, activeConversationId = null) => {
  const clientRef = useRef(null);
  const hasSubscribedRef = useRef(false);
  const shouldReconnectRef = useRef(true);
  const refreshPromiseRef = useRef(null);

  const [connected, setConnected] = useState(false);
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [connectionError, setConnectionError] = useState("");

  const getAccessToken = () => localStorage.getItem("accessToken");
  const getRefreshToken = () => localStorage.getItem("refreshToken");

  const clearAuthStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      if (!decoded?.exp) return false;
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const refreshAccessToken = useCallback(async () => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    refreshPromiseRef.current = axios
      .post(`${API_BASE_URL}/auth/refresh`, { refreshToken })
      .then((response) => {
        const {
          accessToken,
          refreshToken: newRefreshToken,
        } = response.data || {};

        if (!accessToken || !newRefreshToken) {
          throw new Error("Refresh response is missing tokens");
        }

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        localStorage.removeItem("token");

        return accessToken;
      })
      .finally(() => {
        refreshPromiseRef.current = null;
      });

    return refreshPromiseRef.current;
  }, []);

  const stopSocket = useCallback(async (reason = "") => {
    shouldReconnectRef.current = false;
    setConnected(false);
    hasSubscribedRef.current = false;

    if (reason) {
      setConnectionError(reason);
    }

    const client = clientRef.current;
    if (client) {
      try {
        client.reconnectDelay = 0;
        await client.deactivate();
      } catch (error) {
        console.error("Error stopping websocket:", error);
      } finally {
        clientRef.current = null;
      }
    }
  }, []);

  const stopSocketForInvalidSession = useCallback(
    async (reason = "Session expired. Please login again.") => {
      clearAuthStorage();
      await stopSocket(reason);
    },
    [stopSocket]
  );

  const getValidAccessToken = useCallback(async () => {
    const accessToken = getAccessToken();

    if (accessToken && isTokenValid(accessToken)) {
      return accessToken;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    return refreshAccessToken();
  }, [refreshAccessToken]);

  useEffect(() => {
    if (!userId) {
      setConnected(false);
      setConnectionError("");
      return;
    }

    let isMounted = true;

    const connectSocket = async () => {
      try {
        const token = await getValidAccessToken();

        if (!isMounted || !token) {
          return;
        }

        shouldReconnectRef.current = true;
        setConnected(false);
        setConnectionError("");
        hasSubscribedRef.current = false;

        const client = new Client({
          webSocketFactory: () => new SockJS(SOCKET_URL),
          reconnectDelay: 5000,
          heartbeatIncoming: 10000,
          heartbeatOutgoing: 10000,

          beforeConnect: async () => {
            if (!shouldReconnectRef.current) {
              throw new Error("Reconnect disabled.");
            }

            try {
              const latestToken = await getValidAccessToken();

              client.connectHeaders = {
                Authorization: `Bearer ${latestToken}`,
              };
            } catch (error) {
              await stopSocketForInvalidSession(
                "Authentication failed. Please login again."
              );
              throw error;
            }
          },

          onConnect: () => {
            setConnected(true);
            setConnectionError("");

            if (hasSubscribedRef.current) return;
            hasSubscribedRef.current = true;

            client.subscribe("/user/queue/messages", (frame) => {
              try {
                const body = JSON.parse(frame.body);

                setIncomingMessages((prev) => {
                  const exists = prev.some(
                    (msg) =>
                      (msg.id && body.id && String(msg.id) === String(body.id)) ||
                      (msg.clientMessageId &&
                        body.clientMessageId &&
                        msg.clientMessageId === body.clientMessageId)
                  );

                  if (exists) {
                    return prev.map((msg) =>
                      (body.id && String(msg.id) === String(body.id)) ||
                      (body.clientMessageId &&
                        msg.clientMessageId === body.clientMessageId)
                        ? { ...msg, ...body }
                        : msg
                    );
                  }

                  return [...prev, body];
                });
              } catch (error) {
                console.error("Failed to parse websocket message:", error);
              }
            });

            client.subscribe("/user/queue/acks", (frame) => {
              try {
                const body = JSON.parse(frame.body);

                setIncomingMessages((prev) => {
                  const exists = prev.some(
                    (msg) =>
                      (msg.id && body.id && String(msg.id) === String(body.id)) ||
                      (msg.clientMessageId &&
                        body.clientMessageId &&
                        msg.clientMessageId === body.clientMessageId)
                  );

                  if (exists) {
                    return prev.map((msg) =>
                      (body.id && String(msg.id) === String(body.id)) ||
                      (body.clientMessageId &&
                        msg.clientMessageId === body.clientMessageId)
                        ? { ...msg, ...body }
                        : msg
                    );
                  }

                  return [...prev, body];
                });
              } catch (error) {
                console.error("Failed to parse ack message:", error);
              }
            });

            client.subscribe("/user/queue/notifications", (frame) => {
              try {
                const body = JSON.parse(frame.body);

                setNotifications((prev) => {
                  const exists = prev.some(
                    (notification) => String(notification.id) === String(body.id)
                  );

                  if (exists) {
                    return prev.map((notification) =>
                      String(notification.id) === String(body.id)
                        ? { ...notification, ...body }
                        : notification
                    );
                  }

                  return [body, ...prev];
                });
              } catch (error) {
                console.error("Failed to parse notification:", error);
              }
            });

            client.subscribe("/user/queue/notifications/unread-count", (frame) => {
              try {
                const count = Number(frame.body);
                setUnreadNotificationCount(Number.isNaN(count) ? 0 : count);
              } catch (error) {
                console.error("Failed to parse unread notification count:", error);
              }
            });

            client.subscribe("/user/queue/messages/unread-count", (frame) => {
              try {
                const count = Number(frame.body);
                setUnreadMessageCount(Number.isNaN(count) ? 0 : count);
              } catch (error) {
                console.error("Failed to parse unread message count:", error);
              }
            });
          },

          onStompError: async (frame) => {
            console.error("STOMP error headers:", frame.headers);
            console.error("STOMP error body:", frame.body);

            setConnected(false);

            const message =
              frame.headers?.message || frame.body || "WebSocket STOMP error";

            setConnectionError(message);

            const lower = String(message).toLowerCase();

            if (
              lower.includes("jwt") ||
              lower.includes("auth") ||
              lower.includes("signature") ||
              lower.includes("unauthorized") ||
              lower.includes("forbidden")
            ) {
              try {
                await refreshAccessToken();

                if (
                  shouldReconnectRef.current &&
                  clientRef.current &&
                  !clientRef.current.active
                ) {
                  clientRef.current.activate();
                }
              } catch {
                await stopSocketForInvalidSession(
                  "Authentication failed. Please login again."
                );
              }
            }
          },

          onWebSocketError: (error) => {
            console.error("WebSocket transport error:", error);
            setConnected(false);
            setConnectionError("WebSocket connection error");
          },

          onWebSocketClose: async (event) => {
            console.warn("WebSocket closed:", event);
            setConnected(false);

            if (!shouldReconnectRef.current) return;

            try {
              await getValidAccessToken();
            } catch {
              await stopSocketForInvalidSession(
                "Token is invalid after reconnect attempt."
              );
            }
          },

          onDisconnect: () => {
            console.log("STOMP disconnected");
            setConnected(false);
            hasSubscribedRef.current = false;
          },
        });

        clientRef.current = client;
        client.activate();
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to initialize websocket connection:", error);
        await stopSocketForInvalidSession("Unable to establish authenticated websocket session.");
      }
    };

    connectSocket();

    return () => {
      isMounted = false;
      shouldReconnectRef.current = false;
      hasSubscribedRef.current = false;
      setConnected(false);

      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [
    userId,
    getValidAccessToken,
    refreshAccessToken,
    stopSocket,
    stopSocketForInvalidSession,
  ]);

  const sendSocketMessage = useCallback(
    ({ recipientId, content, type = "TEXT", clientMessageId }) => {
      if (!clientRef.current || !connected) {
        throw new Error("WebSocket is not connected.");
      }

      if (!recipientId) {
        throw new Error("Recipient id is required.");
      }

      const trimmedContent = content?.trim();
      if (!trimmedContent) {
        throw new Error("Message content is empty.");
      }

      const payload = {
        clientMessageId: clientMessageId || `client-${Date.now()}`,
        recipientId,
        content: trimmedContent,
        type,
      };

      clientRef.current.publish({
        destination: "/app/chat.send",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return payload;
    },
    [connected]
  );

  const conversationMessages = activeConversationId
    ? incomingMessages.filter(
        (msg) => String(msg.conversationId) === String(activeConversationId)
      )
    : incomingMessages;

  return {
    connected,
    connectionError,
    incomingMessages,
    conversationMessages,
    notifications,
    unreadNotificationCount,
    unreadMessageCount,
    sendSocketMessage,
    disconnectSocket: stopSocket,
  };
};