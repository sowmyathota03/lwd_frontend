import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, MoreVertical, Loader2 } from "lucide-react";
import { deleteJob } from "../../api/JobApi";
import ConfirmModal from "../common/ConfirmModal";

export default function JobActions({ job, onDelete, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const menuRef = useRef(null);

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
      onDelete(job.id);
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
  const handleStatusToggle = () => {
    const newStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";
    onStatusChange(job.id, newStatus);
    setShowMenu(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="p-1 hover:bg-gray-100 rounded transition"
          disabled={deleting}
        >
          {deleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MoreVertical className="w-4 h-4" />
          )}
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <button
              onClick={() =>
                (window.location.href = `/jobs/updatejob/${job.id}`)
              }
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Pencil className="w-3 h-3" /> Edit
            </button>

            <button
              onClick={handleStatusToggle}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              {job.status === "OPEN" ? "Close" : "Reopen"}
            </button>

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
