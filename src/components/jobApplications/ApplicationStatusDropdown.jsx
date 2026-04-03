import { useEffect, useState } from "react";
import { changeApplicationStatus } from "../../api/JobApplicationApi";
import { Loader2, Circle } from "lucide-react";

/**
 * Modernizes the status label for administrative use.
 * Formats a status enum value into a readable label.
 */
const formatLabel = (status) =>
  status
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const STATUS_CONFIG = {
  APPLIED: { color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-500/20 shadow-slate-500/10" },
  SHORTLISTED: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20 shadow-blue-500/10" },
  INTERVIEW_SCHEDULED: { color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20 shadow-cyan-500/10" },
  SELECTED: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20 shadow-emerald-500/10" },
  REJECTED: { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20 shadow-rose-500/10" },
  HIRED: { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20 shadow-amber-500/20" },
};

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

  const currentConfig = STATUS_CONFIG[status] || STATUS_CONFIG.APPLIED;

  return (
    <div className="flex items-center gap-3 w-fit">
      
      {/* PROFESSIONAL STATUS CONSOLE */}
      <div className={`
        relative flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 border shadow-xs
        ${currentConfig.bg} ${currentConfig.border}
      `}>
        
        {/* Dynamic Pulsing Indicator */}
        <div className="relative flex items-center justify-center">
           <div className={`absolute w-2 h-2 rounded-full animate-ping opacity-25 ${currentConfig.color} bg-current`}></div>
           <Circle className={`w-2 h-2 fill-current ${currentConfig.color} relative z-10`} />
        </div>

        <select
          value={status}
          onChange={handleChange}
          disabled={loading}
          className={`
            bg-transparent border-none p-0 pr-6 text-xs font-semibold outline-none cursor-pointer disabled:cursor-wait appearance-none
            ${currentConfig.color}
          `}
          style={{ backgroundImage: "none" }} // remove default arrow to use custom styling
        >
          {statusOptions.map((option) => (
            <option key={option} value={option} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold tracking-normal py-2 normal-case">
              {formatLabel(option)}
            </option>
          ))}
        </select>

        {/* Custom Arrow Indicator */}
        <div className={`absolute right-3 pointer-events-none transition-transform duration-300 ${loading ? "rotate-180" : ""}`}>
           <div className={`w-1.5 h-1.5 border-r-2 border-b-2 border-current rotate-45 mb-0.5 opacity-40 ${currentConfig.color}`}></div>
        </div>
      </div>

      {/* SYNTHESIS LOADER */}
      {loading && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 animate-pulse">
           <Loader2 className="w-3 h-3 animate-spin" />
           <span className="text-xs font-medium">Updating...</span>
        </div>
      )}
    </div>
  );
}