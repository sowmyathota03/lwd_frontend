// src/pages/jobs/JobActions.jsx
import { deleteJob, changeJobStatus } from "../../api/JobApi";

export default function JobActions({ jobId, currentStatus, refresh }) {
  const isOpen = currentStatus === "OPEN";

  const handleStatusChange = async () => {
    try {
      await changeJobStatus(jobId, isOpen ? "CLOSED" : "OPEN");
      refresh();
    } catch (err) {
      alert("Failed to update job status");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(jobId);
      refresh();
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Open / Close Button */}
      <button
        onClick={handleStatusChange}
        className={`px-3 py-1.5 text-xs font-medium rounded border transition
          ${
            isOpen
              ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          }`}
      >
        {isOpen ? "Close Job" : "Open Job"}
      </button>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="px-3 py-1.5 text-xs font-medium rounded border border-red-300 bg-red-500 text-white hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
}
