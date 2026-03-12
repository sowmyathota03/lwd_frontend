import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { Bookmark } from "lucide-react";

function JobCards({ job, recentlyOpened = false }) {
  const navigate = useNavigate();

  if (!job) return null;

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  const handleSaveJob = (e) => {
    e.stopPropagation();

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const alreadySaved = savedJobs.some((j) => j.id === job.id);

    if (alreadySaved) {
      alert("Job already saved");
      return;
    }

    savedJobs.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    alert("Job saved successfully");
  };

  const skills =
    typeof job.skills === "string"
      ? job.skills.split(",").map((s) => s.trim())
      : job.skills || [];

  return (
    <article
      onClick={handleClick}
      className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row justify-between items-start gap-4 w-full"
    >
      {/* Left section */}
      <div className="flex-1 w-full space-y-3">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
          {job.title || "Untitled Job"}
        </h3>

        {/* Company */}
        <p className="text-sm text-gray-600 line-clamp-1">
          {job.company?.companyName || "Unknown Company"}
        </p>

        {/* Details row */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {job.location && <span className="bg-gray-100 px-2 py-1 rounded-md">{job.location}</span>}
          {job.minExperience != null && job.maxExperience != null && (
            <span className="bg-gray-100 px-2 py-1 rounded-md">
              {job.minExperience}–{job.maxExperience} yrs
            </span>
          )}
          <span className="bg-gray-100 px-2 py-1 rounded-md">
            {job.salary ? `₹${job.salary.toLocaleString()} LPA` : "Salary N/A"}
          </span>
          {job.jobType && <span className="bg-gray-100 px-2 py-1 rounded-md">{job.jobType}</span>}
        </div>

        {/* Description */}
        {job.description && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="text-xs text-gray-400 self-center">
                  +{skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
        {recentlyOpened && (
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
            Recently Opened
          </span>
        )}

        <button
          onClick={handleSaveJob}
          aria-label="Save job"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Bookmark size={16} />
          <span>Save</span>
        </button>

        {job.createdAt && (
          <time className="text-xs text-gray-400" dateTime={job.createdAt}>
            Posted {timeAgo(job.createdAt)}
          </time>
        )}
      </div>
    </article>
  );
}

export default JobCards;