import React from "react";
import { formatLastActive } from "../../utils/formatLastActive";

const ChatHeader = ({ conversation, onMenuClick }) => {
  if (!conversation) return null;

  const {
    name,
    avatar,
    isActive = false,
    lastActiveAt = null,
  } = conversation;

  // Handle avatar loading errors gracefully
  const handleAvatarError = (e) => {
    e.target.style.display = "none";
    e.target.parentElement.classList.add("fallback-mode");
  };

  // Get status display text and styling
  const getStatusConfig = () => {
    if (isActive) {
      return {
        text: "Active now",
        dotClass: "bg-emerald-500",
        pulseClass: "ring-emerald-400/50",
        textClass: "text-emerald-600 dark:text-emerald-400",
      };
    }
    return {
      text: typeof lastActiveAt === "string" ? lastActiveAt : `Last seen ${lastActiveAt}`,
      dotClass: "bg-gray-400 dark:bg-gray-500",
      pulseClass: "",
      textClass: "text-gray-500 dark:text-gray-400",
    };
  };

  const statusConfig = getStatusConfig();

  return (
    <header className="sticky top-0 z-20 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200/70 dark:border-slate-700/70 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        {/* User Info Section */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar with status indicator */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center text-blue-700 dark:text-blue-300 font-semibold text-lg overflow-hidden shadow-sm ring-2 ring-white dark:ring-slate-800">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={handleAvatarError}
                />
              ) : (
                <span className="select-none">
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>
            
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg leading-tight truncate">
              {name}
            </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
  <span
    className={`inline-block w-1.5 h-1.5 rounded-full ${
      isActive ? statusConfig.dotClass : "bg-gray-400 dark:bg-gray-500"
    }`}
  />
  <p className={`text-xs font-medium ${statusConfig.textClass} truncate`}>
    {isActive ? "Active now" : formatLastActive(lastActiveAt)}
  </p>
</div>
           
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* More Options Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400/50 active:scale-95"
            aria-label="More options"
            title="More options"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(ChatHeader);
