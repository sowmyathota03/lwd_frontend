import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { formatNoticePeriod } from "../../utils/formatNoticePeriod";
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
      className="lwd-card lwd-card-hover p-5 cursor-pointer flex flex-col sm:flex-row justify-between gap-4"
    >
      {/* LEFT */}
      <div className="flex-1 space-y-3">
        <h3 className="text-xl font-semibold">
          {job.title || "Untitled Job"}
        </h3>

        <div className="flex gap-2">
          {job.company?.companyName && (
            <p className="lwd-text">{job.company.companyName}</p>
          )}

          {job.location && (
            <p className="lwd-text">{job.location}</p>
          )}
        </div>

        {/* DETAILS */}
        <div className="flex flex-wrap gap-2 text-sm">
          {job.minExperience != null && job.maxExperience != null && (
            <span className="lwd-badge">
              {job.minExperience}–{job.maxExperience} yrs
            </span>
          )}

          {job.minSalary && job.maxSalary && (
            <span className="lwd-badge">
              ₹{job.minSalary}L - ₹{job.maxSalary}L
            </span>
          )}

          {job.jobType && (
            <span className="lwd-badge">{job.jobType}</span>
          )}

          {job.workplaceType && (
            <span className="lwd-badge">{job.workplaceType}</span>
          )}

          {job.noticePreference && (
            <span className="lwd-badge">
              {job.noticePreference.replaceAll("_", " ")}
            </span>
          )}

          {job.roleCategory && (
            <span className="lwd-badge">{job.roleCategory}</span>
          )}

          {job.maxNoticePeriod && (
            <span className="lwd-badge">
              Max Notice: {formatNoticePeriod(job.maxNoticePeriod)}
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        {job.description && (
          <p className="lwd-text line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Skills
            </p>

            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 6).map((skill, index) => (
                <span key={index} className="lwd-badge text-xs">
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

      {/* RIGHT */}
      <div className="flex flex-col justify-between items-end gap-3 sm:w-auto w-full">

        {/* TOP */}
        <div className="flex flex-col items-end gap-2">
          {recentlyOpened && (
            <span className="lwd-badge bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              Recently Opened
            </span>
          )}

          <button
            onClick={handleSaveJob}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md 
            text-gray-600 hover:text-blue-600 hover:bg-blue-50 
            dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-slate-700 transition"
          >
            <Bookmark size={16} />
            Save
          </button>

          {job.totalApplications != null && (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {job.totalApplications} applications
            </span>
          )}
        </div>

        {/* DATE */}
        {job.createdAt && (
          <time
            className="text-xs text-gray-400"
            dateTime={job.createdAt}
          >
            Posted {timeAgo(job.createdAt)}
          </time>
        )}
      </div>
    </article>
  );
}

export default JobCards;