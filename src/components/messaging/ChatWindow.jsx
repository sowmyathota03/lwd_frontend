import { useEffect, useRef, useMemo } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import EmptyChatState from "./EmptyChatState";

const ChatWindow = ({
  conversation,
  messages,
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
          className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"} animate-pulse`}
        >
          <div
            className={`h-14 rounded-2xl ${
              i % 2 === 0
                ? "bg-blue-500/20"
                : "bg-slate-700/60"
            } w-52`}
          />
        </div>
      ))}
    </div>
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-20 h-20 mb-4 rounded-full bg-linear-to-br from-blue-500/15 to-indigo-500/15 flex items-center justify-center">
        <span className="text-3xl opacity-80">💬</span>
      </div>
      <h3 className="text-slate-200 font-semibold text-lg">No messages yet</h3>
      <p className="text-slate-400 text-sm mt-1 max-w-xs">
        Start the conversation by sending your first message.
      </p>
    </div>
  );

  const renderErrorState = () => (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-16 h-16 mb-4 rounded-full bg-red-500/15 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-400"
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
      <h3 className="text-slate-100 font-semibold">Failed to load messages</h3>
      <p className="text-slate-400 text-sm mt-1">{error}</p>
      <button
        onClick={onRetryLoadMessages}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl shadow-sm transition"
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
    <div className="flex-1 flex flex-col h-full bg-[#08142b] border-l border-slate-800 relative overflow-hidden">
      <ChatHeader conversation={conversation} />

      {!connected && !loading && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center">
          <p className="text-xs text-amber-300 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Reconnecting to chat server...
          </p>
        </div>
      )}

      <div className="border-b border-slate-800 px-4 py-3 bg-[#0b1833]/90 backdrop-blur-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSelectionMode}
            className="text-xs px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition"
          >
            {selectionMode ? "Cancel Selection" : "Select Messages"}
          </button>

          {selectionMode && (
            <span className="text-xs text-slate-400">
              {normalizedSelectedIds.length} selected
            </span>
          )}
        </div>

        {selectionMode && normalizedSelectedIds.length > 0 && (
          <button
            type="button"
            onClick={onDeleteSelectedMessages}
            disabled={deleteLoading}
            className="text-xs px-3.5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {deleteLoading
              ? "Deleting..."
              : `Delete Selected (${normalizedSelectedIds.length})`}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-5 bg-linear-to-b from-[#08142b] via-[#08142b] to-[#091a37] scroll-smooth lwd-scrollbar">
        <div className="max-w-4xl mx-auto space-y-1">
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

      <div className="border-t border-slate-800 bg-[#0b1833]/95 backdrop-blur-sm">
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