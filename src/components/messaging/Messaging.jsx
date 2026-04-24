import {
  useState,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import {
  getConversations,
  getOrCreateConversation,
  getMessages,
  markConversationAsRead,
  deleteMessage,
  deleteSelectedMessages,
} from "../../api/messagingApi";
import { useMessagingSocket } from "../../hooks/useMessagingSocket";
import { formatConversationTime } from "../../utils/formatConversationTime";

const PAGE_SIZE = 20;

const MessagingPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { username } = useParams();
  const [searchParams] = useSearchParams();

 const getMessagingBaseRoute = (pathname) => {
  if (pathname.startsWith("/company-admin/messaging")) {
    return "/company-admin/messaging";
  }

  if (pathname.startsWith("/recruiter/messaging")) {
    return "/recruiter/messaging";
  }

  return "/messaging"; // ✅ job seeker
};

const routeBase = getMessagingBaseRoute(location.pathname);

  const initialTargetUserId = searchParams.get("userId");

  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [allMessages, setAllMessages] = useState({});

  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [conversationError, setConversationError] = useState("");
  const [messageError, setMessageError] = useState("");

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const processedSocketKeysRef = useRef(new Set());
  const initializedFromUrlRef = useRef(false);
  const latestMessageFetchConversationIdRef = useRef(null);

  const selectedConversation = useMemo(() => {
    return (
      conversations.find(
        (conv) => String(conv.id) === String(selectedConversationId)
      ) || null
    );
  }, [conversations, selectedConversationId]);

  const { connected, connectionError, incomingMessages, sendSocketMessage } =
    useMessagingSocket(user?.id, selectedConversation?.id);

  const slugify = useCallback((value) => {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }, []);

  const sortConversationsByLatest = useCallback((list) => {
    return [...list].sort((a, b) => {
      const timeA = a?.rawTime ? new Date(a.rawTime).getTime() : 0;
      const timeB = b?.rawTime ? new Date(b.rawTime).getTime() : 0;
      return timeB - timeA;
    });
  }, []);

  const safelyReplaceUrl = useCallback((nextUrl) => {
    const currentUrl =
      window.location.pathname + window.location.search + window.location.hash;

    if (currentUrl !== nextUrl) {
      window.history.replaceState({}, "", nextUrl);
    }
  }, []);

  const buildConversationUrl = useCallback(
    (conversation) => {
      if (!conversation) return routeBase;

      const usernameSlug = slugify(conversation.name || "user");
      return `${routeBase}/${usernameSlug}?userId=${encodeURIComponent(
        conversation.otherUserId
      )}`;
    },
    [routeBase, slugify]
  );

  const mapConversation = useCallback(
    (conv) => {
      const isMeLastSender =
        String(conv?.lastMessageSenderId) === String(user?.id);

      return {
        id: conv?.conversationId,
        otherUserId: conv?.otherUserId,
        name: conv?.otherUserName || "Unknown User",
        avatar: conv?.otherUserProfileImageUrl || null,
        lastMessage: conv?.lastMessageText || "No messages yet",
        lastMessageStatus: conv?.lastMessageStatus || null,
        lastMessageSenderId: conv?.lastMessageSenderId || null,
        isMeLastSender,
        time: formatConversationTime(conv?.lastMessageAt),
        rawTime: conv?.lastMessageAt || null,
        unread: Number(conv?.unreadCount || 0),
        isActive: conv?.isActive === true,
        lastActiveAt: conv?.lastActiveAt || null,
      };
    },
    [user?.id]
  );

  const upsertConversationIfMissing = useCallback(
    (list, conversation) => {
      const exists = list.some(
        (item) => String(item.id) === String(conversation.id)
      );
      if (exists) return list;
      return sortConversationsByLatest([conversation, ...list]);
    },
    [sortConversationsByLatest]
  );

  const stableHandleSelectConversation = useCallback(
    (conversation) => {
      if (!conversation) return;

      const nextId = String(conversation.id);
      if (String(selectedConversationId) === nextId) return;

      setSelectedConversationId(conversation.id);
      setMessageError("");
      setSelectionMode(false);
      setSelectedMessageIds([]);
      safelyReplaceUrl(buildConversationUrl(conversation));
    },
    [selectedConversationId, buildConversationUrl, safelyReplaceUrl]
  );

  const refreshMessagesForSelectedConversation = useCallback(async () => {
    if (!selectedConversationId || !user?.id) return;

    const conversationId = selectedConversationId;
    latestMessageFetchConversationIdRef.current = String(conversationId);

    try {
      setLoadingMessages(true);
      setMessageError("");

      const data = await getMessages(conversationId, null, PAGE_SIZE);

      if (
        latestMessageFetchConversationIdRef.current !== String(conversationId)
      ) {
        return;
      }

      const mappedMessages = (data || [])
        .map((msg) => ({
          id: msg.id,
          clientMessageId: msg.clientMessageId,
          text: msg.content || "",
          sender: String(msg.senderId) === String(user.id) ? "ME" : "OTHER",
          senderId: msg.senderId,
          conversationId: msg.conversationId,
          type: msg.type || "TEXT",
          status: msg.status || "SENT",
          timestamp: msg.createdAt,
          softDeleted: msg.softDeleted === true,
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      setAllMessages((prev) => {
        const prevMessages = prev[conversationId] || [];

        const sameLength = prevMessages.length === mappedMessages.length;
        const sameContent =
          sameLength &&
          prevMessages.every((msg, index) => {
            const next = mappedMessages[index];
            return (
              String(msg.id) === String(next.id) &&
              String(msg.clientMessageId || "") ===
                String(next.clientMessageId || "") &&
              msg.text === next.text &&
              msg.status === next.status &&
              msg.timestamp === next.timestamp &&
              msg.softDeleted === next.softDeleted
            );
          });

        if (sameContent) return prev;

        return {
          ...prev,
          [conversationId]: mappedMessages,
        };
      });

      await markConversationAsRead(conversationId);

      setConversations((prev) => {
        let changed = false;

        const next = prev.map((conv) => {
          if (
            String(conv.id) === String(conversationId) &&
            Number(conv.unread || 0) !== 0
          ) {
            changed = true;
            return { ...conv, unread: 0 };
          }
          return conv;
        });

        return changed ? next : prev;
      });
    } catch (error) {
      if (
        latestMessageFetchConversationIdRef.current === String(conversationId)
      ) {
        console.error("Failed to fetch messages:", error);
        setMessageError(
          error?.response?.data?.message || "Failed to load messages."
        );
      }
    } finally {
      if (
        latestMessageFetchConversationIdRef.current === String(conversationId)
      ) {
        setLoadingMessages(false);
      }
    }
  }, [selectedConversationId, user?.id]);

  useEffect(() => {
    let isMounted = true;

    const fetchConversations = async () => {
      try {
        setLoadingConversations(true);
        setConversationError("");

        const data = await getConversations(0, PAGE_SIZE);
        const content = data?.content || [];

        let mappedConversations = sortConversationsByLatest(
          content.map(mapConversation)
        );

        let conversationToSelect = null;

        if (!initializedFromUrlRef.current) {
          if (initialTargetUserId) {
            conversationToSelect = mappedConversations.find(
              (conv) => String(conv.otherUserId) === String(initialTargetUserId)
            );

            if (!conversationToSelect) {
              const created = await getOrCreateConversation(initialTargetUserId);
              conversationToSelect = mapConversation(created);
              mappedConversations = upsertConversationIfMissing(
                mappedConversations,
                conversationToSelect
              );
            }
          } else if (username) {
            conversationToSelect =
              mappedConversations.find(
                (conv) => slugify(conv.name) === slugify(username)
              ) || null;
          }

          initializedFromUrlRef.current = true;
        } else if (selectedConversationId) {
          conversationToSelect =
            mappedConversations.find(
              (conv) => String(conv.id) === String(selectedConversationId)
            ) || null;
        }

        if (!conversationToSelect && mappedConversations.length > 0) {
          conversationToSelect = mappedConversations[0];
        }

        if (!isMounted) return;

        setConversations((prev) => {
          const sameLength = prev.length === mappedConversations.length;
          const sameContent =
            sameLength &&
            prev.every((item, index) => {
              const next = mappedConversations[index];
              return (
                String(item.id) === String(next.id) &&
                item.lastMessage === next.lastMessage &&
                item.lastMessageStatus === next.lastMessageStatus &&
                String(item.lastMessageSenderId || "") ===
                  String(next.lastMessageSenderId || "") &&
                item.rawTime === next.rawTime &&
                Number(item.unread || 0) === Number(next.unread || 0) &&
                item.isActive === next.isActive &&
                item.lastActiveAt === next.lastActiveAt
              );
            });

          return sameContent ? prev : mappedConversations;
        });

        setSelectedConversationId((prev) => {
          const nextId = conversationToSelect?.id || null;
          return String(prev) === String(nextId) ? prev : nextId;
        });

        if (conversationToSelect) {
          safelyReplaceUrl(buildConversationUrl(conversationToSelect));
        }
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to fetch conversations:", error);
        setConversationError(
          error?.response?.data?.message || "Failed to load conversations."
        );
      } finally {
        if (isMounted) {
          setLoadingConversations(false);
        }
      }
    };

    fetchConversations();

    return () => {
      isMounted = false;
    };
  }, [
    initialTargetUserId,
    username,
    mapConversation,
    sortConversationsByLatest,
    slugify,
    selectedConversationId,
    buildConversationUrl,
    safelyReplaceUrl,
    upsertConversationIfMissing,
  ]);

  useEffect(() => {
    refreshMessagesForSelectedConversation();
  }, [refreshMessagesForSelectedConversation]);

  useEffect(() => {
    if (!incomingMessages?.length) return;

    const newSocketMessages = incomingMessages.filter((msg) => {
      const key =
        msg.id?.toString() ||
        msg.clientMessageId ||
        `${msg.conversationId}-${msg.senderId}-${msg.createdAt}`;

      if (!key) return false;
      if (processedSocketKeysRef.current.has(key)) return false;

      processedSocketKeysRef.current.add(key);
      return true;
    });

    if (!newSocketMessages.length) return;

    setAllMessages((prev) => {
      let changed = false;
      const updated = { ...prev };

      newSocketMessages.forEach((msg) => {
        const conversationId = msg.conversationId;
        if (!conversationId) return;

        const mappedMessage = {
          id: msg.id || `ws-${msg.clientMessageId || Date.now()}`,
          clientMessageId: msg.clientMessageId,
          text: msg.content || "",
          sender: String(msg.senderId) === String(user?.id) ? "ME" : "OTHER",
          senderId: msg.senderId,
          conversationId: msg.conversationId,
          type: msg.type || "TEXT",
          status: msg.status || "SENT",
          timestamp: msg.createdAt || new Date().toISOString(),
          softDeleted: msg.softDeleted === true,
        };

        const existing = updated[conversationId] || [];

        const existingIndex = existing.findIndex(
          (item) =>
            (mappedMessage.id &&
              String(item.id) === String(mappedMessage.id)) ||
            (mappedMessage.clientMessageId &&
              item.clientMessageId === mappedMessage.clientMessageId)
        );

        if (existingIndex >= 0) {
          const current = existing[existingIndex];
          const same =
            current.text === mappedMessage.text &&
            current.status === mappedMessage.status &&
            current.timestamp === mappedMessage.timestamp &&
            current.softDeleted === mappedMessage.softDeleted;

          if (!same) {
            const cloned = [...existing];
            cloned[existingIndex] = {
              ...cloned[existingIndex],
              ...mappedMessage,
            };
            updated[conversationId] = cloned.sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
            changed = true;
          }
        } else {
          updated[conversationId] = [...existing, mappedMessage].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          changed = true;
        }
      });

      return changed ? updated : prev;
    });

    setConversations((prev) => {
      let changed = false;
      let updatedList = prev;

      newSocketMessages.forEach((latestForConversation) => {
        const conversationId = latestForConversation.conversationId;
        if (!conversationId) return;

        const isCurrentlyOpen =
          String(selectedConversationId) === String(conversationId);

        const isIncomingFromOther =
          String(latestForConversation.senderId) !== String(user?.id);

        const isMeLastSender =
          String(latestForConversation.senderId) === String(user?.id);

        const existingConversation = updatedList.find(
          (conv) => String(conv.id) === String(conversationId)
        );

        if (!existingConversation) return;

        updatedList = updatedList.map((conv) => {
          if (String(conv.id) !== String(conversationId)) return conv;

          const nextLastMessage =
            latestForConversation.content || conv.lastMessage;
          const nextLastMessageStatus =
            latestForConversation.status || "SENT";
          const nextLastMessageSenderId = latestForConversation.senderId;
          const nextRawTime =
            latestForConversation.createdAt || new Date().toISOString();
          const nextUnread =
            !isCurrentlyOpen && isIncomingFromOther
              ? (conv.unread || 0) + 1
              : conv.unread;

          const same =
            conv.lastMessage === nextLastMessage &&
            conv.lastMessageStatus === nextLastMessageStatus &&
            String(conv.lastMessageSenderId || "") ===
              String(nextLastMessageSenderId || "") &&
            conv.isMeLastSender === isMeLastSender &&
            conv.rawTime === nextRawTime &&
            Number(conv.unread || 0) === Number(nextUnread || 0);

          if (same) return conv;

          changed = true;

          return {
            ...conv,
            lastMessage: nextLastMessage,
            lastMessageStatus: nextLastMessageStatus,
            lastMessageSenderId: nextLastMessageSenderId,
            isMeLastSender,
            time: formatConversationTime(nextRawTime),
            rawTime: nextRawTime,
            unread: nextUnread,
            isActive: conv.isActive,
            lastActiveAt: conv.lastActiveAt,
          };
        });
      });

      return changed ? sortConversationsByLatest(updatedList) : prev;
    });
  }, [
    incomingMessages,
    user?.id,
    selectedConversationId,
    sortConversationsByLatest,
  ]);

  const handleSendMessage = useCallback(
    (text) => {
      if (!selectedConversation || !text.trim()) return;

      if (!connected) {
        setMessageError("Socket is not connected. Please wait and try again.");
        return;
      }

      const now = new Date().toISOString();
      const clientMessageId = `client-${Date.now()}`;

      const optimisticMessage = {
        id: `temp-${clientMessageId}`,
        clientMessageId,
        text,
        sender: "ME",
        senderId: user?.id,
        conversationId: selectedConversation.id,
        type: "TEXT",
        status: "PENDING",
        timestamp: now,
        softDeleted: false,
      };

      setAllMessages((prev) => ({
        ...prev,
        [selectedConversation.id]: [
          ...(prev[selectedConversation.id] || []),
          optimisticMessage,
        ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
      }));

      setConversations((prev) => {
        let changed = false;

        const next = prev.map((conv) => {
          if (conv.id !== selectedConversation.id) return conv;

          const same =
            conv.lastMessage === text &&
            conv.lastMessageStatus === "PENDING" &&
            String(conv.lastMessageSenderId || "") === String(user?.id) &&
            conv.isMeLastSender === true &&
            conv.rawTime === now;

          if (same) return conv;

          changed = true;

          return {
            ...conv,
            lastMessage: text,
            lastMessageStatus: "PENDING",
            lastMessageSenderId: user?.id,
            isMeLastSender: true,
            time: formatConversationTime(now),
            rawTime: now,
          };
        });

        return changed ? sortConversationsByLatest(next) : prev;
      });

      setMessageError("");

      try {
        sendSocketMessage({
          clientMessageId,
          recipientId: selectedConversation.otherUserId,
          content: text,
          type: "TEXT",
        });
      } catch (error) {
        console.error("Failed to send websocket message:", error);

        setAllMessages((prev) => ({
          ...prev,
          [selectedConversation.id]: (prev[selectedConversation.id] || []).map(
            (msg) =>
              msg.clientMessageId === clientMessageId
                ? { ...msg, status: "FAILED" }
                : msg
          ),
        }));

        setConversations((prev) => {
          let changed = false;

          const next = prev.map((conv) => {
            if (conv.id !== selectedConversation.id) return conv;

            const same =
              conv.lastMessage === text &&
              conv.lastMessageStatus === "FAILED" &&
              String(conv.lastMessageSenderId || "") === String(user?.id) &&
              conv.isMeLastSender === true;

            if (same) return conv;

            changed = true;

            return {
              ...conv,
              lastMessage: text,
              lastMessageStatus: "FAILED",
              lastMessageSenderId: user?.id,
              isMeLastSender: true,
            };
          });

          return changed ? next : prev;
        });

        setMessageError("Failed to send message.");
      }
    },
    [
      selectedConversation,
      connected,
      sendSocketMessage,
      user?.id,
      sortConversationsByLatest,
    ]
  );

  const updateConversationAfterMessageDelete = useCallback(
    (conversationId, updatedMessages) => {
      const sortedMessages = [...updatedMessages].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      const lastMessage = sortedMessages[sortedMessages.length - 1];

      setConversations((prev) => {
        let changed = false;

        const next = prev.map((conv) => {
          if (String(conv.id) !== String(conversationId)) return conv;

          const nextLastMessage = lastMessage?.softDeleted
            ? "This message was deleted"
            : lastMessage?.text || "No messages yet";

          const nextLastMessageStatus = lastMessage?.status || null;
          const nextLastMessageSenderId = lastMessage?.senderId || null;
          const nextIsMeLastSender = lastMessage
            ? String(lastMessage.senderId) === String(user?.id)
            : false;
          const nextTime = lastMessage?.timestamp
            ? formatConversationTime(lastMessage.timestamp)
            : "";
          const nextRawTime = lastMessage?.timestamp || null;

          const same =
            conv.lastMessage === nextLastMessage &&
            conv.lastMessageStatus === nextLastMessageStatus &&
            String(conv.lastMessageSenderId || "") ===
              String(nextLastMessageSenderId || "") &&
            conv.isMeLastSender === nextIsMeLastSender &&
            conv.time === nextTime &&
            conv.rawTime === nextRawTime;

          if (same) return conv;

          changed = true;

          return {
            ...conv,
            lastMessage: nextLastMessage,
            lastMessageStatus: nextLastMessageStatus,
            lastMessageSenderId: nextLastMessageSenderId,
            isMeLastSender: nextIsMeLastSender,
            time: nextTime,
            rawTime: nextRawTime,
          };
        });

        return changed ? next : prev;
      });
    },
    [user?.id]
  );

  const handleDeleteMessage = useCallback(
    async (messageId) => {
      if (!selectedConversation?.id || !messageId) return;

      const conversationId = selectedConversation.id;
      const previousMessages = allMessages[conversationId] || [];

      const optimisticallyUpdated = previousMessages.map((msg) =>
        String(msg.id) === String(messageId)
          ? {
              ...msg,
              softDeleted: true,
              text: "This message was deleted",
            }
          : msg
      );

      setAllMessages((prev) => ({
        ...prev,
        [conversationId]: optimisticallyUpdated,
      }));

      updateConversationAfterMessageDelete(
        conversationId,
        optimisticallyUpdated
      );

      try {
        await deleteMessage(conversationId, messageId);
      } catch (error) {
        console.error("Delete message failed:", error);

        setAllMessages((prev) => ({
          ...prev,
          [conversationId]: previousMessages,
        }));

        updateConversationAfterMessageDelete(conversationId, previousMessages);
        setMessageError(
          error?.response?.data?.message || "Failed to delete message."
        );
      }
    },
    [selectedConversation, allMessages, updateConversationAfterMessageDelete]
  );

  const handleDeleteSelectedMessages = useCallback(async () => {
    if (!selectedConversation?.id || selectedMessageIds.length === 0) return;

    const conversationId = selectedConversation.id;
    const previousMessages = allMessages[conversationId] || [];

    setDeleteLoading(true);

    const selectedIdSet = new Set(selectedMessageIds.map((id) => String(id)));

    const optimisticallyUpdated = previousMessages.map((msg) =>
      selectedIdSet.has(String(msg.id))
        ? {
            ...msg,
            softDeleted: true,
            text: "This message was deleted",
          }
        : msg
    );

    setAllMessages((prev) => ({
      ...prev,
      [conversationId]: optimisticallyUpdated,
    }));

    updateConversationAfterMessageDelete(conversationId, optimisticallyUpdated);

    try {
      await deleteSelectedMessages(conversationId, selectedMessageIds);
      setSelectedMessageIds([]);
      setSelectionMode(false);
    } catch (error) {
      console.error("Bulk delete failed:", error);

      setAllMessages((prev) => ({
        ...prev,
        [conversationId]: previousMessages,
      }));

      updateConversationAfterMessageDelete(conversationId, previousMessages);
      setMessageError(
        error?.response?.data?.message ||
          "Failed to delete selected messages."
      );
    } finally {
      setDeleteLoading(false);
    }
  }, [
    selectedConversation,
    selectedMessageIds,
    allMessages,
    updateConversationAfterMessageDelete,
  ]);

  const handleToggleMessageSelection = useCallback((messageId) => {
    const normalizedId = String(messageId);

    setSelectedMessageIds((prev) => {
      const normalizedPrev = prev.map((id) => String(id));

      return normalizedPrev.includes(normalizedId)
        ? normalizedPrev.filter((id) => id !== normalizedId)
        : [...normalizedPrev, normalizedId];
    });
  }, []);

  const stableConversations = useMemo(() => conversations, [conversations]);

  const currentMessages = useMemo(() => {
    return (allMessages[selectedConversation?.id] || []).sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [allMessages, selectedConversation?.id]);

  return (
    <div className="flex h-screen w-full bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div
        className={`
          ${selectedConversation ? "hidden md:flex" : "flex"}
          w-full md:w-80 lg:w-96 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm
          border-r border-gray-200/50 dark:border-slate-700/50 shadow-xl z-10
          transition-all duration-300 ease-in-out
        `}
      >
        <ConversationList
          conversations={stableConversations}
          activeId={selectedConversation?.id}
          onSelect={stableHandleSelectConversation}
          loading={loadingConversations}
          error={conversationError}
        />
      </div>

      <div
        className={`
          ${selectedConversation ? "flex" : "hidden md:flex"}
          flex-1 flex flex-col relative bg-gray-50/40 dark:bg-slate-900/40
        `}
      >
        {selectedConversation && (
          <button
            onClick={() => {
              setSelectedConversationId(null);
              setMessageError("");
              setSelectionMode(false);
              setSelectedMessageIds([]);
              safelyReplaceUrl(routeBase);
            }}
            className="md:hidden absolute top-4 left-4 z-20 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200"
            aria-label="Back to conversations"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {!connected && (
          <div className="relative z-10 px-4 py-2.5 text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-b border-amber-200 dark:border-amber-800/50 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Connecting to live chat...
          </div>
        )}

        {connectionError && (
          <div className="relative z-10 px-4 py-2.5 text-xs font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-b border-red-200 dark:border-red-800/50 flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {connectionError}
          </div>
        )}

        <ChatWindow
          conversation={selectedConversation}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onRetryLoadMessages={refreshMessagesForSelectedConversation}
          onDeleteMessage={handleDeleteMessage}
          onDeleteSelectedMessages={handleDeleteSelectedMessages}
          onToggleMessageSelection={handleToggleMessageSelection}
          selectionMode={selectionMode}
          setSelectionMode={setSelectionMode}
          selectedMessageIds={selectedMessageIds}
          deleteLoading={deleteLoading}
          loading={loadingMessages}
          error={messageError}
          connected={connected}
        />
      </div>
    </div>
  );
};

export default MessagingPage;