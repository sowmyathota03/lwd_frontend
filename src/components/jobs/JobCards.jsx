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
  Globe
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
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={handleClick}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-blue-500/50 transition-all duration-300 group relative"
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 min-w-0 space-y-4">
          
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {job.title || "Untitled Role"}
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <Globe size={14} className="text-slate-400" /> {job.company?.companyName || "Company Registry"}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" /> {job.location || "Location Not Specified"}
              </span>
            </div>
          </div>

          {/* ATTRIBUTES */}
          <div className="flex flex-wrap gap-2">
            {job.minExperience != null && (
              <div className="inline-flex items-center px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Briefcase size={12} className="mr-1.5 opacity-70" />
                {job.minExperience}–{job.maxExperience || "+"} Yrs
              </div>
            )}

            {job.minSalary && (
              <div className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Banknote size={12} className="mr-1.5 opacity-70" />
                ₹{job.minSalary}L - ₹{job.maxSalary}L
              </div>
            )}

            {job.jobType && (
              <div className="inline-flex items-center px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 text-xs font-semibold text-blue-700 dark:text-blue-400">
                <Clock size={12} className="mr-1.5 opacity-70" />
                {job.jobType}
              </div>
            )}
          </div>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {skills.slice(0, 4).map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded"
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
          )}
        </div>

        {/* RIGHT CONTENT / ACTIONS */}
        <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:w-40">
          
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={handleSaveJob}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all"
              title="Save Job"
            >
              <Bookmark size={18} />
            </button>

            <button
              onClick={handleClick}
              className="flex-1 px-4 h-10 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5"
            >
              Details
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
               <Users size={12} /> {job.totalApplications || 0} applied
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
               <Calendar size={12} /> {timeAgo(job.createdAt)}
            </div>
          </div>

        </div>
      </div>
    </motion.article>
  );
}

export default JobCards;
 JobCards;