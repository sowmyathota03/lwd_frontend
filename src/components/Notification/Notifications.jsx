import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../api/notificationApi";

import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";
import NotificationItem from "./NotificationItem";
import LoadingSkeleton from "./LoadingSkeleton";
import Header from "./Header";
import SortDropdown from "./SortDropdown";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [readAllLoading, setReadAllLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sortBy, setSortBy] = useState("unread"); // default: unread first

  const navigate = useNavigate();

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMyNotifications(page, 10);
      setNotifications(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load notifications. Please try again.");
      showToast("Failed to load notifications", "error");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Sorting logic
  const sortNotifications = useCallback((notifs, sortType) => {
    const list = [...notifs];
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };

    switch (sortType) {
      case "newest":
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "unread":
        return list.sort((a, b) => {
          if (a.isRead === b.isRead) return new Date(b.createdAt) - new Date(a.createdAt);
          return a.isRead ? 1 : -1;
        });
      case "priority-high":
        return list.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
      case "priority-low":
        return list.sort((a, b) => (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0));
      default:
        return list;
    }
  }, []);

  const sortedNotifications = useMemo(() => {
    return sortNotifications(notifications, sortBy);
  }, [notifications, sortBy, sortNotifications]);

  const handleRead = async (id) => {
    try {
      setActionLoadingId(id);
      await markNotificationAsRead(id);
      await loadNotifications();
      showToast("Notification marked as read", "success");
    } catch (err) {
      showToast("Failed to mark as read", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReadAll = async () => {
    const unreadExist = notifications.some((n) => !n.isRead);
    if (!unreadExist) return;
    try {
      setReadAllLoading(true);
      await markAllNotificationsAsRead();
      await loadNotifications();
      showToast("All notifications marked as read", "success");
    } catch (err) {
      showToast("Failed to mark all as read", "error");
    } finally {
      setReadAllLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoadingId(id);
      await deleteNotification(id);
      const updated = notifications.filter((n) => n.id !== id);
      setNotifications(updated);
      if (updated.length === 0 && page > 0) setPage((p) => p - 1);
      else await loadNotifications();
      showToast("Notification deleted", "success");
    } catch (err) {
      showToast("Failed to delete notification", "error");
    } finally {
      setActionLoadingId(null);
      setDeleteTarget(null);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Header unreadCount={unreadCount} onMarkAllRead={handleReadAll} isLoading={readAllLoading} />

        <div className="flex justify-end mb-4">
        {/* Sorting Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          {error && (
            <div className="m-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                <button
                  onClick={loadNotifications}
                  className="ml-auto text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {loading && <LoadingSkeleton />}

          {!loading && !error && sortedNotifications.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">All caught up!</h3>
              <p className="text-gray-500 dark:text-gray-400">No new notifications at the moment. Check back later.</p>
            </div>
          )}

          {!loading && !error && sortedNotifications.length > 0 && (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {sortedNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={handleRead}
                  onDelete={(id) => setDeleteTarget(id)}
                  isActionLoading={actionLoadingId}
                />
              ))}
            </div>
          )}

          {!loading && !error && totalPages > 1 && (
            <div className="border-t border-gray-100 dark:border-slate-800 px-4 py-4 bg-gray-50/50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0 || readAllLoading}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1 || readAllLoading}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>

        {!loading && notifications.length > 0 && (
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
            Click on any notification to view details
          </p>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Notification"
        message="Are you sure you want to delete this notification? This action cannot be undone."
        onConfirm={() => handleDelete(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Notifications;