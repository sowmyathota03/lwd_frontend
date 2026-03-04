import { useEffect, useState } from "react";

const AddStatus = ({ updatedAt }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!updatedAt) {
      setStatus("No activity");
      return;
    }

    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffMs = now - updatedDate;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      setStatus("Active today");
    } else if (diffDays === 1) {
      setStatus("Active yesterday");
    } else if (diffDays < 7) {
      setStatus(`Active ${diffDays} days ago`);
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      setStatus(`Active ${weeks} week${weeks > 1 ? "s" : ""} ago`);
    } else {
      const months = Math.floor(diffDays / 30);
      setStatus(`Active ${months} month${months > 1 ? "s" : ""} ago`);
    }
  }, [updatedAt]);

  return (
    <div>
      <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
        {status}
      </span>
    </div>
  );
};

export default AddStatus;