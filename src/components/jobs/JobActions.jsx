// src/pages/jobs/JobActions.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteJob, changeJobStatus } from "../../api/JobApi";

export default function JobActions({ job, onDelete, onStatusChange }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isOpen = job.status === "OPEN";

  // ================= STATUS CHANGE =================
  const handleStatusChange = async () => {
    try {
      setLoading(true);

      const newStatus = isOpen ? "CLOSED" : "OPEN";
      await changeJobStatus(job.id, newStatus);

      // Update parent state immediately
      onStatusChange(job.id, newStatus);
    } catch (err) {
      alert("Failed to update job status");
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteJob(job.id);

      // Remove job from parent immediately
      onDelete(job.id);
    } catch (err) {
      alert("Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Update Button (Only if OPEN) */}
      {isOpen && (
        <button
          onClick={() =>
            navigate(`/jobs/updatejob/${job.id}`, {
              state: job,
            })
          }
          disabled={loading}
          className="px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition disabled:opacity-50"
        >
          Update
        </button>
      )}

      {/* Open / Close Button */}
      <button
        onClick={handleStatusChange}
        disabled={loading}
        className={`px-3 py-1.5 text-xs font-medium rounded border transition disabled:opacity-50
          ${
            isOpen
              ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          }`}
      >
        {loading ? "Processing..." : isOpen ? "Close Job" : "Open Job"}
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1.5 text-xs font-medium rounded border border-red-300 bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
