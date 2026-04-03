import { useEffect, useRef, useMemo } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import EmptyChatState from "./EmptyChatState";

const ChatWindow = ({
  conversation,
  messages = [],
  onSendMessage,
  onRetryLoadMessages,
  onDeleteMessage,
  onDeleteSelectedMessages,
  onToggleMessageSelection,
  selectionMode = false,
  setSelectionMode,
  selectedMessageIds = [],
  deleteLoading = false,
  loading = false,
  error = "",
  connected = false,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, conversation?.id]);

  const normalizedSelectedIds = useMemo(
    () => selectedMessageIds.map((id) => String(id)),
    [selectedMessageIds]
  );

  const handleToggleSelectionMode = () => {
    if (typeof setSelectionMode !== "function") return;
    setSelectionMode((prev) => !prev);
  };

  const renderLoadingSkeleton = () => (
    <div className="flex flex-col gap-4 p-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex animate-pulse ${
            i % 2 === 0 ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`h-14 w-52 rounded-2xl ${
              i % 2 === 0
                ? "bg-blue-500/20"
                : "bg-slate-200 dark:bg-slate-700/60"
            }`}
          />
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-blue-500/15 to-indigo-500/15">
        <span className="text-3xl opacity-80">💬</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        No messages yet
      </h3>
      <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
        Start the conversation by sending your first message.
      </p>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15">
        <svg
          className="h-8 w-8 text-red-500 dark:text-red-400"
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
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100">
        Failed to load messages
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {error}
      </p>
      <button
        onClick={onRetryLoadMessages}
        className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-blue-700"
        type="button"
      >
        Try again
      </button>
    </div>
  );

  if (!conversation) {
    return <EmptyChatState />;
  }

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-hidden border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-[#08142b]">
      <ChatHeader conversation={conversation} />

      {!connected && !loading && (
        <div className="border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-center">
          <p className="flex items-center justify-center gap-2 text-xs text-amber-600 dark:text-amber-300">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500 dark:bg-amber-400" />
            Reconnecting to chat server...
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-[#0b1833]/90">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSelectionMode}
            className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {selectionMode ? "Cancel Selection" : "Select Messages"}
          </button>

          {selectionMode && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {normalizedSelectedIds.length} selected
            </span>
          )}
        </div>

        {selectionMode && normalizedSelectedIds.length > 0 && (
          <button
            type="button"
            onClick={onDeleteSelectedMessages}
            disabled={deleteLoading}
            className="rounded-xl bg-red-600 px-3.5 py-2 text-xs text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleteLoading
              ? "Deleting..."
              : `Delete Selected (${normalizedSelectedIds.length})`}
          </button>
        )}
      </div>

      <div className="lwd-scrollbar flex-1 overflow-y-auto bg-linear-to-b from-slate-50 to-white px-2 py-5 scroll-smooth sm:px-4 dark:from-[#09152d] dark:to-[#08142b]">
        <div className="mx-auto max-w-4xl space-y-1">
          {loading ? (
            renderLoadingSkeleton()
          ) : error ? (
            renderErrorState()
          ) : messages.length === 0 ? (
            renderEmptyState()
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={
                  msg.id ||
                  msg.clientMessageId ||
                  `${msg.timestamp}-${msg.text?.slice(0, 10)}`
                }
                message={msg}
                isMe={msg.sender === "ME"}
                selectionMode={selectionMode}
                isSelected={normalizedSelectedIds.includes(String(msg.id))}
                onToggleSelect={onToggleMessageSelection}
                onDeleteMessage={onDeleteMessage}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-[#0b1833]/95">
        <MessageInput
          onSendMessage={onSendMessage}
          disabled={loading || !connected || deleteLoading}
          connected={connected}
        />
      </div>
    </div>
  );
};

export default ChatWindow;