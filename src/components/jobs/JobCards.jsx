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
      className="bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-slate-200/60 dark:border-slate-700/60 p-6 sm:p-7 
      cursor-pointer flex flex-col sm:flex-row justify-between gap-6 transition-all duration-300 shadow-sm 
      hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-600/50 group w-full"
    >
      {/* LEFT CONTENT */}
      <div className="flex-1 min-w-0 space-y-4">
        
        {/* Title and Badge Row */}
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-[22px] font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-tight transition-colors line-clamp-1">
              {job.title || "Untitled Job"}
            </h3>
            {recentlyOpened && (
              <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 rounded-full border border-orange-200 dark:border-orange-800/50 shrink-0 mt-0.5 sm:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 animate-pulse"></span>
                Hot Role
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm md:text-base font-semibold text-slate-600 dark:text-slate-300 mt-1.5">
            {job.company?.companyName && (
              <span className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors max-w-full truncate">
                <svg className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {job.company.companyName}
              </span>
            )}

            {job.company?.companyName && job.location && (
              <span className="text-slate-300 dark:text-slate-600 hidden sm:block">•</span>
            )}

            {job.location && (
              <span className="flex items-center gap-1.5 truncate max-w-full">
                <svg className="w-4 h-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            )}
          </div>
        </div>

        {/* DETAILS PILLS */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-50 dark:border-slate-700/50">
          {job.minExperience != null && job.maxExperience != null && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300 rounded-lg">
              <svg className="w-3.5 h-3.5 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {job.minExperience}–{job.maxExperience} yrs
            </span>
          )}

          {job.minSalary && job.maxSalary && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
              ₹{job.minSalary}L - ₹{job.maxSalary}L
            </span>
          )}

          {job.jobType && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-lg">
              {job.jobType}
            </span>
          )}

          {job.workplaceType && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg">
              {job.workplaceType}
            </span>
          )}

          {job.maxNoticePeriod && (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300 rounded-lg">
              Max Notice: {formatNoticePeriod(job.maxNoticePeriod)}
            </span>
          )}
        </div>

        {/* DESCRIPTION SUMMARY */}
        {job.description && (
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {skills.slice(0, 5).map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-700/80 rounded border border-slate-200 dark:border-slate-600"
                >
                  {skill}
                </span>
              ))}

              {skills.length > 5 && (
                <span className="px-2 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 self-center">
                  +{skills.length - 5}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT / ACTIONS */}
      <div className="flex sm:flex-col flex-row-reverse justify-between items-center sm:items-end gap-3 sm:w-auto w-full pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-700/50">

        {/* SAVE & APPLY ACTIONS */}
        <div className="flex flex-row-reverse sm:flex-col items-center sm:items-end gap-3 w-full">
          <button
            onClick={handleSaveJob}
            className="flex items-center justify-center gap-1.5 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 text-sm font-semibold rounded-xl bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:bg-slate-700/50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-all shrink-0 group/btn"
            title="Save Job"
          >
            <Bookmark className="w-5 h-5 sm:w-4 sm:h-4 group-hover/btn:fill-blue-100 dark:group-hover/btn:fill-slate-600 transition-colors" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            onClick={handleClick}
            className="flex-1 sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2 text-sm sm:text-base font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all group-hover:bg-blue-600 sm:group-hover:translate-x-0"
          >
            View Details
          </button>
        </div>

        {/* METADATA (APPLICATIONS + DATE) */}
        <div className="flex flex-col sm:items-end w-full sm:w-auto">
          {job.totalApplications != null && (
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              {job.totalApplications} applied
            </span>
          )}
          
          {job.createdAt && (
            <time className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5" dateTime={job.createdAt}>
              Posted {timeAgo(job.createdAt)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}

export default JobCards;