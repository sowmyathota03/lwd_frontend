import { useState } from "react";
import { changeApplicationStatus } from "../../api/JobApplicationApi";

export default function ApplicationStatusDropdown({
  applicationId,
  currentStatus,
  onStatusUpdated,
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const statusOptions = [
    "APPLIED",
    "SHORTLISTED",
    "INTERVIEW_SCHEDULED",
    "SELECTED",
    "REJECTED",
    "HIRED",
  ];

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    try {
      setLoading(true);
      await changeApplicationStatus(applicationId, newStatus);

      setStatus(newStatus);

      // notify parent component
      if (onStatusUpdated) {
        onStatusUpdated(applicationId, newStatus);
      }
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className="border rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {loading && (
        <span className="text-xs text-blue-500 animate-pulse">
          Updating...
        </span>
      )}
    </div>
  );
}
