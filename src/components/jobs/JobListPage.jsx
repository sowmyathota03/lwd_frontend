import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobsByRecruiter } from "../../api/RecruiterAdminApi";
import Loader from "../common/Loader";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Activity, 
  Users, 
  ChevronRight, 
  ArrowLeft,
  Search,
  LayoutGrid,
  ShieldCheck,
  Building,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobListPage() {
  const { recruiterId } = useParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recruiterId) {
      fetchJobs();
    }
  }, [recruiterId]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getJobsByRecruiter(recruiterId);
      setJobs(data);
    } catch (err) {
      setError("Failed to load registry synthesis");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading)
    return (
      <div className="lwd-page flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader fullScreen={false} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">Synchronizing Registry...</p>
      </div>
    );

  return (
    <div className="lwd-page min-h-screen py-24 px-6 relative overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-500">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-12 relative z-10"
      >
        
        {/* ================= HERO INGRESS ================= */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group/back mb-4"
            >
              <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
              Retract to Management
            </button>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center shadow-2xl">
                  <LayoutGrid size={20} />
               </div>
               <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none italic uppercase">
                 Posting <span className="text-blue-600">Registry</span>
               </h1>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
               Consolidated opportunity synthesis for Recruiter ID: <span className="text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-0.5">{recruiterId}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
             <div className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-3 shadow-xl">
                <div className="text-right">
                   <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Total Synchronized</p>
                   <p className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{jobs.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                   <Activity size={18} />
                </div>
             </div>
          </div>
        </motion.div>

        {error && (
          <motion.div variants={itemVariants} className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-rose-600">
              {error}
            </p>
          </motion.div>
        )}

        {/* ================= REGISTRY TABLE ================= */}
        <motion.div variants={itemVariants}>
          {jobs.length === 0 ? (
            <div className="lwd-card-glass p-20 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2">
               <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-200 dark:text-slate-700 flex items-center justify-center mb-2">
                  <Users size={32} />
               </div>
               <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Null Listing Registry</h3>
               <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest max-w-xs mx-auto">
                  This identifier has not yet synchronized any active opportunities to the portal.
               </p>
            </div>
          ) : (
            <div className="lwd-card-glass p-0 border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden bg-white/30 dark:bg-slate-900/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                      <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Opportunity identity</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Corporate Entity</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Region Registry</th>
                      <th className="px-6 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Status protocol</th>
                      <th className="px-8 py-5 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {jobs.map((job) => (
                      <tr 
                        key={job.id} 
                        onClick={() => navigate(`/job/${job.id}`)}
                        className="group/row cursor-pointer transition-all duration-300 hover:bg-white dark:hover:bg-slate-800/70"
                      >
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center group-hover/row:scale-110 transition-transform">
                                 <Briefcase size={18} />
                              </div>
                              <div>
                                 <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover/row:text-blue-600 transition-colors">{job.title}</p>
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{job.jobType} • {job.minExperience}-{job.maxExperience} yrs</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                              <Building size={14} className="text-slate-400" />
                              {job.company?.companyName || "Unknown Entity"}
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
                              <MapPin size={14} className="text-slate-400" />
                              {job.location}
                           </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className={`
                            inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border
                            ${job.status.toLowerCase() === "active"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                              }
                          `}>
                            <div className={`w-1.5 h-1.5 rounded-full ${job.status.toLowerCase() === "active" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                            {job.status}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover/row:text-blue-600 group-hover/row:bg-blue-50 dark:group-hover/row:bg-blue-900/20 transition-all flex items-center justify-center ml-auto">
                              <ChevronRight size={18} className="group-hover/row:translate-x-1 transition-transform" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* ================= DECORATIVE FOOTER ================= */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 py-10"
        >
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-blue-500" /> Administrative Protocol</span>
              <div className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
              <span className="flex items-center gap-2"><Activity size={12} className="text-blue-500" /> Real-time Synthesis</span>
           </div>
           <p>© 2026 Registry Systems Inc.</p>
        </motion.div>

      </motion.div>
    </div>
  );
}