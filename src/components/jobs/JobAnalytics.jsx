import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobAnalytics } from "../../api/JobApi";
import Loader from "../common/Loader";
import { 
  Pencil, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Briefcase, 
  MapPin, 
  Banknote, 
  Building, 
  Globe, 
  ArrowLeft,
  Flame,
  FileText,
  Activity,
  History,
  BarChart2
} from "lucide-react";
import JobApplicationsByJob from "../jobApplications/JobApplicationsByJob";
import { motion } from "framer-motion";

// ===== Meta Field =====
const MetaField = ({ label, value, icon: Icon }) => {
  if (!value) return null;
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all">
      <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
        {Icon && <Icon size={12} />}
        {label}
      </div>
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
        {value}
      </p>
    </div>
  );
};

export default function JobAnalytics() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobAnalytics", jobId],
    queryFn: () => getJobAnalytics(jobId).then((res) => res.data),
    enabled: !!jobId,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="lwd-page flex flex-col items-center justify-center p-10 space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
           <XCircle size={32} />
        </div>
        <p className="text-base font-bold text-slate-600 dark:text-slate-400">
           Failed to load job analytics
        </p>
      </div>
    );

  if (!data) return null;

  const { job, totalApplications, statusCounts } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page py-16 px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl space-y-10"
      >
        
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors group/back mb-4"
            >
              <ArrowLeft size={16} className="group-hover/back:-translate-x-1 transition-transform" />
              Back to Jobs
            </button>
            <h1 className="lwd-h2 text-slate-900 leading-tight">
              {job.title}
            </h1>
            <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Building size={16} /> {job.company?.companyName} <span className="text-slate-300">•</span> <MapPin size={16} /> {job.location}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {job.deleted ? (
              <span className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-wide text-slate-500 border border-slate-200 dark:border-slate-700">
                Deleted Listing
              </span>
            ) : (
              <span className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide border
                ${job.open 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                  : "bg-red-50 text-red-600 border-red-100"
                }
              `}>
                <div className={`w-2 h-2 rounded-full ${job.open ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`}></div>
                {job.open ? "Open" : "Closed"}
              </span>
            )}

            {!job.deleted && job.open && (
              <button
                onClick={() => navigate(`/managejob/updatejob/${job.id}`, { state: job })}
                className="lwd-btn-outline flex items-center gap-2"
              >
                <Pencil size={16} />
                Edit Listing
              </button>
            )}
          </div>
        </motion.div>

        {/* METRIC RIBBON */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="lwd-card p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-blue-600 mb-4">
              <Activity size={14} /> Total Applied
            </div>
            <p className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">{totalApplications}</p>
          </div>

          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="lwd-card p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400 mb-4">
                <CheckCircle2 size={14} /> {status}
              </div>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">{count}</p>
            </div>
          ))}
        </motion.div>

        {/* JOB DETAILS */}
        <motion.div variants={itemVariants} className="lwd-card p-8 overflow-hidden">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <BarChart2 size={20} />
            </div>
            <div>
               <h2 className="text-base font-bold text-slate-900 dark:text-white">Job Details</h2>
               <p className="text-xs font-medium text-slate-400 mt-0.5">Summary of position parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <MetaField 
              label="Salary" 
              icon={Banknote}
              value={job.minSalary && job.maxSalary ? `₹${job.minSalary}L – ₹${job.maxSalary}L` : "Negotiable"} 
            />
            <MetaField label="Job Type" icon={Briefcase} value={job.jobType} />
            <MetaField label="Work Mode" icon={Globe} value={job.workplaceType} />
            <MetaField label="Role Category" icon={Activity} value={job.roleCategory} />
            <MetaField label="Department" icon={History} value={job.department} />
            <MetaField 
              label="Experience" 
              icon={Flame}
              value={job.minExperience != null && job.maxExperience != null ? `${job.minExperience}–${job.maxExperience} yrs` : null} 
            />
            <MetaField label="Industry" icon={Building} value={job.industry} />
            <MetaField label="Notice Preference" icon={Clock} value={job.noticePreference?.replaceAll("_", " ")} />
            <MetaField label="Max Notice" icon={History} value={job.maxNoticePeriod > 0 ? `${job.maxNoticePeriod} Days` : "Immediate"} />
            <MetaField label="Posted On" icon={Clock} value={job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-IN") : null} />
          </div>
        </motion.div>

        {/* ROLE NARRATIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {["description", "responsibilities", "requirements", "benefits"].map((field) => 
             job[field] && (
               <motion.div key={field} variants={itemVariants} className="lwd-card p-8">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                     <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                        <FileText size={16} />
                     </div>
                     <h3 className="text-sm font-bold capitalize text-slate-700 dark:text-slate-200">{field}</h3>
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
                    {job[field]}
                  </p>
               </motion.div>
             )
           )}
        </div>

        {/* APPLICATIONS */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
                 <Users size={20} />
              </div>
              <div>
                 <h2 className="text-base font-bold text-slate-900 dark:text-white">Applicants</h2>
                 <p className="text-xs font-medium text-slate-400">All candidates who applied for this listing</p>
              </div>
           </div>
           <JobApplicationsByJob jobId={jobId} />
        </motion.div>

      </motion.div>
    </div>
  );
}