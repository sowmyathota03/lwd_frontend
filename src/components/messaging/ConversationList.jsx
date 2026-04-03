import React, { useMemo, useState, useCallback } from "react";
import {
  Check,
  CheckCheck,
  Clock3,
  AlertCircle,
  Search,
  X,
} from "lucide-react";

const ConversationList = ({
  conversations = [],
  activeId,
  onSelect,
  loading = false,
  error = "",
}) => {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return conversations;

    return conversations.filter((conv) =>
      conv?.name?.toLowerCase().includes(keyword)
    );
  }, [conversations, search]);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const renderMessageStatus = useCallback((conv) => {
    if (!conv?.isMeLastSender) return null;

    switch (conv?.lastMessageStatus) {
      case "SENT":
        return (
          <Check
            size={13}
            className="shrink-0 text-gray-400 dark:text-gray-500"
          />
        );

      case "DELIVERED":
        return (
          <CheckCheck
            size={13}
            className="shrink-0 text-gray-400 dark:text-gray-500"
          />
        );

      case "READ":
        return (
          <CheckCheck
            size={13}
            className="shrink-0 text-blue-500 dark:text-blue-400"
          />
        );

      case "PENDING":
        return (
          <Clock3
            size={13}
            className="shrink-0 text-amber-500 dark:text-amber-400"
          />
        );

      case "FAILED":
        return (
          <AlertCircle
            size={13}
            className="shrink-0 text-red-500 dark:text-red-400"
          />
        );

      default:
        return null;
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 w-full md:w-80 lg:w-96 shadow-xl overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>💬</span>
          <span>Messages</span>
        </h2>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          {search && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              aria-label="Clear search"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-2 scroll-smooth lwd-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <div className="w-8 h-8 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Loading conversations...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mb-3">
              <svg
                className="w-7 h-7 text-gray-400 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              No conversations yet
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Start a new chat from a user's profile
            </p>
          </div>
        ) : (
          <div className="space-y-1 px-2">
            {filteredConversations.map((conv) => {
              const isSelected = String(activeId) === String(conv.id);

              return (
                <button
                  key={conv.id}
                  onClick={() => onSelect(conv)}
                  type="button"
                  aria-pressed={isSelected}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left
                    ${
                      isSelected
                        ? "bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm ring-1 ring-blue-200 dark:ring-blue-800/50"
                        : "hover:bg-gray-50 dark:hover:bg-slate-800/50 active:bg-gray-100 dark:active:bg-slate-800"
                    }
                  `}
                >
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold text-lg overflow-hidden shadow-inner">
                      {conv.avatar ? (
                        <img
                          src={conv.avatar}
                          alt={conv.name || "User avatar"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{conv.name?.charAt(0)?.toUpperCase() || "?"}</span>
                      )}
                    </div>

                    {conv.isActive === true && (
                      <span
                        className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm"
                        aria-label="Online"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                        {conv.name || "Unknown User"}
                      </h4>

                      <span className="text-[11px] text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                        {conv.time || ""}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-0.5 gap-2">
                      <div className="flex items-center gap-1 min-w-0 pr-1">
                        {conv.isMeLastSender && (
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300 shrink-0">
                            You:
                          </span>
                        )}

                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {conv.lastMessage || "No messages yet"}
                        </p>

                        {renderMessageStatus(conv)}
                      </div>

                      {conv.unread > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-[11px] font-bold min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center shadow-sm shrink-0">
                          {conv.unread > 99 ? "99+" : conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ConversationList);