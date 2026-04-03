import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompanyById } from "../../api/CompanyApi";
import Loader from "../../components/common/Loader";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase, 
  FileText, 
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export default function CompanyDashboardPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await getCompanyById(companyId);
        setCompany(data);
      } catch (err) {
        console.error("Failed to fetch company", err);
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [companyId]);

  if (loading)
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader message="Synthesizing Dashboard..." />
      </div>
    );

  if (!company)
    return (
      <div className="min-h-screen flex items-center justify-center -mt-12">
        <div className="lwd-card-glass p-12 text-center text-rose-500 font-bold uppercase tracking-widest italic animate-pulse">
           <ShieldAlert className="mx-auto mb-4" size={32} />
           Company Not Found
        </div>
      </div>
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page min-h-screen py-10 px-6 relative overflow-hidden">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl space-y-12 relative z-10"
      >
        
        {/* BRANDED HERO HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-100 dark:border-slate-800/50 pb-12">
          <div className="w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
            <Building2 size={40} />
          </div>
          <div className="text-center md:text-left space-y-3">
             <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-1 shadow-sm">
                <Activity size={12} />
                Partner Profile
             </div>
             <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
               {company.companyName}
             </h1>
             <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <MapPin size={12} />
                   {company.location}
                </div>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition"
                  >
                    <Globe size={12} />
                    {company.website?.replace(/^https?:\/\//, '')}
                    <ArrowUpRight size={10} />
                  </a>
                )}
             </div>
          </div>
        </motion.div>

        {/* STATUS & OVERVIEW CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <motion.div variants={itemVariants} className="lwd-card-glass p-8 space-y-6 lg:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Identity Status
              </h4>
              <div className={`
                flex items-center gap-3 px-5 py-4 rounded-2xl border
                ${company.isActive
                  ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-100 dark:border-emerald-800/20"
                  : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border-rose-100 dark:border-rose-800/20"
                }
              `}>
                <div className={`w-3 h-3 rounded-full ${company.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></div>
                <div className="flex flex-col">
                   <span className="text-xs font-black uppercase tracking-widest">{company.isActive ? "Active Partner" : "Restricted Access"}</span>
                   <span className="text-[10px] opacity-60 font-medium">Compliance Protocol Valid</span>
                </div>
                {company.isActive ? <ShieldCheck className="ml-auto" size={20} /> : <ShieldAlert className="ml-auto" size={20} />}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-relaxed">
                Administrative metrics are calculated based on real-time activity and compliance reports.
              </p>
           </motion.div>

           {/* OPERATIONS GRID */}
           <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <motion.button
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/admin/company/${companyId}/recruiters`)}
                className="lwd-card bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-2xl hover:shadow-blue-500/5 transition-all text-left flex flex-col justify-between group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <div className="mt-8">
                   <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                     Manage Recruiters
                     <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                   </h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audit active hirers & access</p>
                </div>
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/recruiter-admin/companies/${companyId}/jobs`)}
                className="lwd-card bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-2xl hover:shadow-indigo-500/5 transition-all text-left flex flex-col justify-between group"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase size={24} />
                </div>
                <div className="mt-8">
                   <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                     Job Portfolio
                     <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                   </h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Evaluate position performance</p>
                </div>
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/recruiter-admin/companies/${companyId}/applications`)}
                className="lwd-card bg-white dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-2xl hover:shadow-violet-500/5 transition-all text-left flex flex-col justify-between group md:col-span-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div className="mt-8">
                   <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                     Candidate Ingress
                     <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                   </h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Process talent engagement & applications</p>
                </div>
              </motion.button>

           </div>
        </div>

      </motion.div>
    </div>
  );
}
