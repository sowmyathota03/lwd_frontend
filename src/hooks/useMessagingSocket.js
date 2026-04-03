import { useCallback, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws-chat";
// const SOCKET_URL = "https://lwd-backend-production-85cd.up.railway.app/ws-chat";

export const useMessagingSocket = (userId, activeConversationId = null) => {

  const clientRef = useRef(null);
  const hasSubscribedRef = useRef(false);

  const [connected, setConnected] = useState(false);
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [connectionError, setConnectionError] = useState("");

  

  useEffect(() => {
    if (!userId) {
      setConnected(false);
      setConnectionError("");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setConnected(false);
      setConnectionError("No auth token found for WebSocket connection.");
      return;
    }

    setConnected(false);
    setConnectionError("");
    hasSubscribedRef.current = false;

    const client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      // debug: (str) => {
      //   console.log("[STOMP]", str);
      // },
      connectHeaders: {
        Authorization: `Bearer ${token}`,
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
      },

      onStompError: (frame) => {
        console.error("STOMP error headers:", frame.headers);
        console.error("STOMP error body:", frame.body);
        setConnected(false);
        setConnectionError(
          frame.headers?.message || frame.body || "WebSocket STOMP error"
        );
      },

      onWebSocketError: (error) => {
        console.error("WebSocket transport error:", error);
        setConnected(false);
        setConnectionError("WebSocket connection error");
      },

      onWebSocketClose: (event) => {
        console.warn("WebSocket closed:", event);
        setConnected(false);
      },

      onDisconnect: () => {
        console.log("STOMP disconnected");
        setConnected(false);
        hasSubscribedRef.current = false;
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      setConnected(false);
      hasSubscribedRef.current = false;

      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [userId]);

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
        (msg) =>
          String(msg.conversationId) === String(activeConversationId)
      )
    : incomingMessages;

  return {
    connected,
    connectionError,
    incomingMessages,
    conversationMessages,
    sendSocketMessage,
  };
};