import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { formatNoticePeriod } from "../../utils/formatNoticePeriod";
import {
  Bookmark,
  MapPin,
  Briefcase,
  Banknote,
  Clock,
  Users,
  Calendar,
  ChevronRight,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

function JobCards({ job, recentlyOpened = false }) {
  const navigate = useNavigate();

  if (!job) return null;

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  const handleSaveJob = (e) => {
    e.stopPropagation();

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const alreadySaved = savedJobs.some((item) => item.id === job.id);

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
      ? job.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : Array.isArray(job.skills)
      ? job.skills
      : [];

  const formatJobType = (value) =>
    value
      ?.toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleClick}
      className="group relative cursor-pointer rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <h3 className="line-clamp-1 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {job.title || "Untitled Role"}
              </h3>

              {recentlyOpened && (
                <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full border border-orange-200 bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700 dark:border-orange-800/50 dark:bg-orange-900/40 dark:text-orange-300 sm:mt-0">
                  <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
                  Hot Role
                </span>
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex max-w-full items-center gap-1.5 truncate transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                <Globe size={14} className="text-slate-400" />
                {job.company?.companyName || "Company Registry"}
              </span>

              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                {job.location || "Location Not Specified"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-slate-50 pt-1 dark:border-slate-700/50">
            {job.minExperience != null && (
              <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-700/50 dark:text-slate-300">
                <Briefcase size={12} className="mr-1.5 opacity-70" />
                {job.minExperience}
                {job.maxExperience != null ? `–${job.maxExperience}` : "+"} yrs
              </span>
            )}

            {job.minSalary && job.maxSalary && (
              <span className="inline-flex items-center rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-900/30 dark:text-emerald-400">
                <Banknote size={12} className="mr-1.5 opacity-70" />
                ₹{job.minSalary}L - ₹{job.maxSalary}L
              </span>
            )}

            {job.jobType && (
              <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Clock size={12} className="mr-1.5 opacity-70" />
                {formatJobType(job.jobType)}
              </span>
            )}

            {job.workplaceType && (
              <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {formatJobType(job.workplaceType)}
              </span>
            )}

            {job.maxNoticePeriod && (
              <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-slate-700/50 dark:text-slate-300">
                Max Notice: {formatNoticePeriod(job.maxNoticePeriod)}
              </span>
            )}
          </div>

          {job.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-base">
              {job.description}
            </p>
          )}

          {skills.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {skills.slice(0, 4).map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {skill}
                  </span>
                ))}

                {skills.length > 4 && (
                  <span className="text-[11px] font-medium text-slate-400">
                    +{skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full flex-row justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-700/50 md:w-40 md:flex-col md:items-end md:border-t-0 md:pt-0">
          <div className="flex w-full items-center gap-2">
            <button
              onClick={handleSaveJob}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:hover:bg-slate-800"
              title="Save Job"
              aria-label="Save Job"
            >
              <Bookmark size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 text-sm font-bold text-white transition-all hover:bg-blue-700"
            >
              Details
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="hidden flex-col items-end gap-1 md:flex">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-tight text-slate-500 dark:text-slate-400">
              <Users size={12} />
              {job.totalApplications || 0} applied
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <Calendar size={12} />
              {job.createdAt ? timeAgo(job.createdAt) : "Recently posted"}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default JobCards;