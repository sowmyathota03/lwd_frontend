import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, MoreVertical, Loader2, Power, RotateCcw, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteJob, changeJobStatus } from "../../api/JobApi";
import ConfirmModal from "../common/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";

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

  // ================= MENU POSITION =================
  const handleMenuToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenUpward(spaceBelow < 170);
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* MENU BUTTON */}
        <button
          onClick={handleMenuToggle}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
            ${showMenu 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }
          `}
          disabled={deleting || statusLoading}
        >
          {deleting || statusLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MoreVertical size={16} />
          )}
        </button>

        {/* DROPDOWN */}
        <AnimatePresence>
          {showMenu && !job.deleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: openUpward ? -10 : 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: openUpward ? -10 : 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`
                absolute right-0 w-48 lwd-card-glass z-[100] shadow-2xl overflow-hidden py-1 border border-slate-100 dark:border-slate-800
                ${openUpward ? "bottom-full mb-2" : "top-full mt-2"}
              `}
            >
              {/* STATUS INDICATOR MINI AREA */}
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${job.status === "OPEN" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-400"}`}></div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status: {job.status}</span>
                 </div>
              </div>

              <div className="p-1 space-y-0.5">
                {/* EDIT */}
                {job.status === "OPEN" && (
                  <button
                    onClick={() => navigate(`/managejob/updatejob/${job.id}`, { state: job })}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all group/item"
                  >
                    <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 group-hover/item:bg-white dark:group-hover/item:bg-slate-900 transition-colors">
                      <Pencil size={12} />
                    </div>
                    Edit Job
                  </button>
                )}

                {/* STATUS TOGGLE */}
                <button
                  onClick={handleStatusToggle}
                  disabled={statusLoading}
                  className={`
                    w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all group/status
                    ${job.status === "OPEN" 
                      ? "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20" 
                      : "text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    }
                  `}
                >
                  <div className={`p-1.5 rounded-md transition-colors ${job.status === "OPEN" ? "bg-amber-100 dark:bg-amber-900/40" : "bg-indigo-100 dark:bg-indigo-900/40"}`}>
                    {statusLoading ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : job.status === "OPEN" ? (
                      <Power size={12} />
                    ) : (
                      <RotateCcw size={12} />
                    )}
                  </div>
                  {job.status === "OPEN" ? "Close Listing" : "Reopen Listing"}
                </button>

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2"></div>

                {/* DELETE */}
                <button
                  onClick={() => setShowConfirm(true)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group/del"
                >
                  <div className="p-1.5 rounded-md bg-rose-100 dark:bg-rose-900/40 transition-colors">
                    <Trash2 size={12} />
                  </div>
                  Delete Job
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Job Listing?"
        message={`Are you sure you want to permanently delete "${job.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowConfirm(false)}
        loading={deleting}
      />
    </>
  );
}