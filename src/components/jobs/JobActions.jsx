import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, MoreVertical, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteJob, changeJobStatus } from "../../api/JobApi";
import ConfirmModal from "../common/ConfirmModal";

export default function JobActions({ job, onDelete, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ================= CLICK OUTSIDE + ESC CLOSE =================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showMenu]);

  // ================= DELETE =================
  const handleDeleteConfirm = async () => {
    setDeleting(true);

    try {
      await deleteJob(job.id);
      onDelete(job.id, true);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete job. Please try again.");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
      setShowMenu(false);
    }
  };

  // ================= STATUS TOGGLE =================
  const handleStatusToggle = async () => {
    const newStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";

    try {
      setStatusLoading(true);
      await changeJobStatus(job.id, newStatus);
      onStatusChange(job.id, newStatus);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update job status");
    } finally {
      setStatusLoading(false);
      setShowMenu(false);
    }
  };

  // ================= MENU TOGGLE (SMART DIRECTION) =================
  const handleMenuToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    // If not enough space below → open upward
    setOpenUpward(spaceBelow < 170);

    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleMenuToggle}
          className="p-1 hover:bg-gray-100 rounded transition"
          disabled={deleting || statusLoading}
        >
          {deleting || statusLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MoreVertical className="w-4 h-4" />
          )}
        </button>

        {showMenu && !job.deleted && (
          <div
            className={`absolute right-0 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-150
              ${openUpward ? "bottom-full mb-1" : "top-full mt-1"}
            `}
          >
            {/* EDIT - Only when OPEN */}
            {job.status === "OPEN" && (
              <button
                onClick={() =>
                  navigate(`/jobs/updatejob/${job.id}`, { state: job })
                }
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>
            )}

            {/* STATUS */}
            <button
              onClick={handleStatusToggle}
              disabled={statusLoading}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              {statusLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : job.status === "OPEN" ? (
                "Close"
              ) : (
                "Reopen"
              )}
            </button>

            {/* DELETE */}
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* 🔥 Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Job?"
        message={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}
