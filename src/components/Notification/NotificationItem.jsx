import { useState, useEffect, useRef } from "react";

const NotificationItem = ({
  notification,
  onRead,
  onDelete,
  isActionLoading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const getTypeIcon = (type) => {
    const icons = {
      APPLICATION_SUBMITTED: "📤",
      APPLICATION_STATUS_CHANGED: "🔄",
      NEW_MESSAGE: "💬",
      JOB_RECOMMENDED: "✨",
      PROFILE_VIEWED: "👀",
      RESUME_VIEWED: "📄",
      RESUME_DOWNLOADED: "⬇️",
      SUBSCRIPTION_ALERT: "💳",
      FEATURE_LIMIT_REACHED: "⚠️",
      NEW_APPLICATION_RECEIVED: "📥",
      JOB_EXPIRES_SOON: "⏰",
      RECRUITER_APPROVAL_PENDING: "🕒",
      SYSTEM_ALERT: "⚙️",
    };
    return icons[type] || "🔔";
  };

  const getTypeStyles = (type) => {
    if (["NEW_MESSAGE"].includes(type))
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    if (
      [
        "APPLICATION_SUBMITTED",
        "APPLICATION_STATUS_CHANGED",
        "NEW_APPLICATION_RECEIVED",
      ].includes(type)
    )
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    if (["JOB_RECOMMENDED"].includes(type))
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    if (["PROFILE_VIEWED", "RESUME_VIEWED", "RESUME_DOWNLOADED"].includes(type))
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300";
    if (["SUBSCRIPTION_ALERT", "FEATURE_LIMIT_REACHED"].includes(type))
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
    if (["JOB_EXPIRES_SOON", "RECRUITER_APPROVAL_PENDING"].includes(type))
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
    return "bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300";
  };

  const getPriorityColor = (priority) => {
    if (priority === "HIGH") return "text-red-500";
    if (priority === "MEDIUM") return "text-yellow-500";
    if (priority === "LOW") return "text-green-500";
    return "text-gray-400";
  };

  const formatRelativeTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div
      onClick={() => {
        if (!notification.isRead) onRead(notification.id);
        if (notification.actionUrl)
          window.location.href = notification.actionUrl;
      }}
      className={`group relative transition-all duration-200 cursor-pointer border-l-4 ${
        !notification.isRead
          ? "bg-blue-50/70 dark:bg-blue-900/10 border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20"
          : "border-transparent hover:bg-gray-50 dark:hover:bg-slate-800/50"
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          {/* Icon */}
          <div
            className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${getTypeStyles(
              notification.type,
            )}`}
          >
            {getTypeIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {notification.title || "Notification"}
              </h4>
              <span
                className={`inline-flex items-center gap-1 text-xs ${getPriorityColor(notification.priority)}`}
              >
                <span>●</span>
                <span className="capitalize">
                  {notification.priority?.toLowerCase()}
                </span>
              </span>
              {!notification.isRead && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  New
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {notification.message}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {formatRelativeTime(notification.createdAt)}
              </span>
            </div>
          </div>

          {/* Dropdown Button */}
          <div
            className="relative shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={buttonRef}
              onClick={handleDropdownToggle}
              disabled={isActionLoading === notification.id}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
              aria-label="Notification actions"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-10 animate-fade-in"
                role="menu"
              >
                {!notification.isRead && (
                  <button
                    onClick={() => onRead(notification.id)}
                    disabled={isActionLoading === notification.id}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    role="menuitem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => onDelete(notification.id)}
                  disabled={isActionLoading === notification.id}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                  role="menuitem"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
