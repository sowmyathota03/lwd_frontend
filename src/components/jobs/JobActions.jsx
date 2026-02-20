// src/pages/jobs/JobActions.jsx
import { useNavigate } from "react-router-dom";
import { deleteJob, changeJobStatus } from "../../api/JobApi";

export default function JobActions({ job, refresh }) {
  const navigate = useNavigate();
  const isOpen = job.status === "OPEN";

  const handleStatusChange = async () => {
    try {
      await changeJobStatus(job.id, isOpen ? "CLOSED" : "OPEN");
      refresh();
    } catch (err) {
      alert("Failed to update job status");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(job.id);
      refresh();
    } catch (err) {
      alert("Failed to delete job");
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
          className="px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
        >
          Update
        </button>
      )}

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
