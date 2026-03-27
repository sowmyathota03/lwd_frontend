import { useEffect, useState } from "react";
import { changeApplicationStatus } from "../../api/JobApplicationApi";

const formatLabel = (status) =>
  status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function ApplicationStatusDropdown({
  applicationId,
  currentStatus,
  onStatusUpdated,
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

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

      // instant UI update
      setStatus(newStatus);

      await changeApplicationStatus(applicationId, newStatus);

      if (onStatusUpdated) {
        onStatusUpdated(applicationId, newStatus);
      }
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(currentStatus);
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
        className="lwd-status-dropdown"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {formatLabel(option)}
          </option>
        ))}
      </select>

      {loading && <span className="lwd-status-loading">Updating...</span>}
    </div>
  );
}