import { useState } from "react";
import { Pencil, Trash2, MoreVertical, Loader2 } from "lucide-react";
import { deleteJob } from "../../api/JobApi"; // import the delete API

export default function JobActions({ job, onDelete, onStatusChange, page }) {
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    setDeleting(true);
    try {
      await deleteJob(job.id);
      onDelete(job.id); // notify parent to remove from list
      // optionally show success toast
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete job. Please try again.");
    } finally {
      setDeleting(false);
      setShowMenu(false);
    }
  };

  const handleStatusToggle = () => {
    const newStatus = job.status === "OPEN" ? "CLOSED" : "OPEN";
    onStatusChange(job.id, newStatus);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-1 hover:bg-gray-100 rounded"
        disabled={deleting}
      >
        {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreVertical className="w-4 h-4" />}
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={() => {
              // navigate to edit page, or open modal
              window.location.href = `/jobs/edit/${job.id}`;
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <Pencil className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={handleStatusToggle}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <span className="w-3 h-3" /> {job.status === "OPEN" ? "Close" : "Reopen"}
          </button>
          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            disabled={deleting}
          >
            <Trash2 className="w-3 h-3" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}