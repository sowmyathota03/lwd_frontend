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

      {/* Dropdown */}
      <select
        value={status}
        onChange={handleChange}
        disabled={loading}
        className="lwd-input-sm"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Loader */}
      {loading && (
        <span className="text-xs lwd-loader animate-pulse">
          Updating...
        </span>
      )}
    </div>
  );
}