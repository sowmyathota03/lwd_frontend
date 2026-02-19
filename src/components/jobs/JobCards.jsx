import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

function JobCards({ job, showApply = true, compact = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/apply/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white rounded-2xl shadow-md hover:shadow-lg 
        transition-all duration-300 
        ${compact ? "p-4" : "p-6"} 
        cursor-pointer border border-gray-100
      `}
    >
      {/* Title */}
      {job.title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {job.title}
        </h3>
      )}

      {/* Company + Location */}
      {(job.company?.companyName || job.location) && (
        <p className="text-sm text-gray-500 mb-3">
          {job.company?.companyName}
          {job.company?.companyName && job.location && " • "}
          {job.location}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.minExperience !== null &&
          job.maxExperience !== null && (
            <span className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {job.minExperience} - {job.maxExperience} yrs
            </span>
          )}

        {job.jobType && (
          <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
            {job.jobType}
          </span>
        )}

        {job.industry && (
          <span className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            {job.industry}
          </span>
        )}

        {job.lwdPreferred && (
          <span className="px-3 py-1 text-xs bg-orange-200 text-orange-700 rounded-full font-semibold">
            LWD Preferred
          </span>
        )}

        {job.noticePreference && (
          <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
            {job.noticePreference.replaceAll("_", " ")}
          </span>
        )}

        {job.maxNoticePeriod > 0 && (
          <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
            Max Notice: {job.maxNoticePeriod} days
          </span>
        )}
      </div>

      {/* Description */}
      {job.description && !compact && (
        <p className="text-sm text-gray-600 mb-2">
          {job.description.length > 100
            ? job.description.substring(0, 100) + "..."
            : job.description}
        </p>
      )}

      {/* Bottom Row */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        {job.createdAt && (
          <span>Posted {timeAgo(job.createdAt)}</span>
        )}

        <span className="font-medium text-gray-700">
          {job.salary
            ? `₹${job.salary.toLocaleString()} LPA`
            : "Not Disclosed"}
        </span>
      </div>

      {/* Apply Button */}
      {showApply && (
        <button
          onClick={handleApply}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded transition"
        >
          Apply Now
        </button>
      )}
    </div>
  );
}

export default JobCards;
