import { useEffect, useState } from "react";
import {
  getAllCompanies,
  blockCompany,
  unblockCompany,
} from "../../api/AdminApi";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { 
  Building2, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  Activity,
  UserPlus,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CompanyManagementPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [confirmCompany, setConfirmCompany] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const navigate = useNavigate();

  const loadCompanies = async (pageNumber = page) => {
    try {
      setLoading(true);
      const data = await getAllCompanies(pageNumber, size);
      setCompanies(data.content);
      setTotalPages(data.totalPages);
      setPage(data.pageNumber);
    } catch (err) {
      console.error("Failed to load companies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleNext = () => {
    if (page < totalPages - 1) {
      loadCompanies(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      loadCompanies(page - 1);
    }
  };

  const openConfirm = (company) => setConfirmCompany(company);

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmCompany(null);
  };

  const confirmAction = async () => {
    if (!confirmCompany) return;

    try {
      setActionLoadingId(confirmCompany.id);

      if (confirmCompany.isActive) {
        await blockCompany(confirmCompany.id);
      } else {
        await unblockCompany(confirmCompany.id);
      }

      setCompanies((prev) =>
        prev.map((c) =>
          c.id === confirmCompany.id
            ? { ...c, isActive: !c.isActive }
            : c
        )
      );
    } catch (err) {
      console.error("Company action failed", err);
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page min-h-screen py-12 px-6 relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl relative z-10"
      >
        
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
              <Building2 size={12} />
              Partner Ecosystem
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Company <span className="text-blue-600 italic underline decoration-blue-500/20 underline-offset-8">Directory</span>
            </h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
            <Activity size={14} className="text-blue-500" />
            Managing {companies.length * totalPages || 0} Organizations
          </p>
        </div>

        {/* Table Container */}
        <div className="lwd-card-glass p-0 overflow-hidden group">
          
          {loading && companies.length === 0 ? (
            <div className="py-24 flex items-center justify-center">
              <Loader fullScreen={false} />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                
                <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50">
                  <tr>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Organization
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Created By
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">
                      Presence
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center">
                      Status
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-right">
                      Operations
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {companies.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-24 text-center text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">
                        No active records found in the database
                      </td>
                    </tr>
                  ) : (
                    companies.map((company) => (
                      <motion.tr 
                        key={company.id} 
                        variants={itemVariants}
                        className="group/row hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all cursor-default"
                      >

                        <td className="px-6 py-5">
                          <div 
                            onClick={() => navigate(`/admin/${company.id}/companyprofile`)}
                            className="flex items-center gap-3 group/link cursor-pointer"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/link:shadow-md transition-all">
                              <Building2 size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                                {company.companyName}
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                                ID: #{company.id.toString().slice(-6)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                             <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                               {company.createdByName || "System Agent"}
                             </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-4">
                            <div className="text-center group/stat">
                              <p className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1">
                                <Users size={12} className="text-blue-500" />
                                {company.totalRecruiters ?? 0}
                              </p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Recruiters</p>
                            </div>
                            <div className="w-px h-6 bg-slate-200/50 dark:border-slate-800/50"></div>
                            <div className="text-center group/stat">
                              <p className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1">
                                <Briefcase size={12} className="text-emerald-500" />
                                {company.totalJobs ?? 0}
                              </p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Jobs</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-center">
                            <div className={`
                              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                              ${company.isActive 
                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800/50" 
                                : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-100 dark:border-rose-800/50"
                              }
                            `}>
                              <div className={`w-1.5 h-1.5 rounded-full ${company.isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></div>
                              {company.isActive ? "ACTIVE" : "BLOCKED"}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-right">
                          <button
                            disabled={actionLoadingId === company.id}
                            onClick={() => openConfirm(company)}
                            className={`
                              inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                              ${company.isActive 
                                ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-rose-100 dark:border-rose-800/20" 
                                : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20"
                              }
                              disabled:opacity-50
                            `}
                          >
                            {actionLoadingId === company.id ? (
                                <Activity size={14} className="animate-spin" />
                            ) : company.isActive ? (
                                <ShieldAlert size={14} />
                            ) : (
                                <ShieldCheck size={14} />
                            )}
                            {company.isActive ? "Restrict" : "Authorize"}
                          </button>
                        </td>

                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm">
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current View</span>
            <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-xs border border-slate-100 dark:border-slate-700/50 text-xs font-black text-blue-600 dark:text-blue-400">
              Page {page + 1}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">of</span>
            <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-xs border border-slate-100 dark:border-slate-700/50 text-xs font-black text-slate-800 dark:text-white">
              {totalPages}
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button
               onClick={handlePrev}
               disabled={page === 0}
               className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 transition-all disabled:opacity-30 disabled:pointer-events-none group"
             >
               <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
             </button>

             <div className="h-4 w-px bg-slate-200/50 dark:bg-slate-800"></div>

             <button
               onClick={handleNext}
               disabled={page >= totalPages - 1}
               className="lwd-btn-primary px-6 h-10 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group"
             >
               Advance
               <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
             </button>
          </div>
        </div>

      </motion.div>

      {/* Action Confirmation Modal */}
      <AnimatePresence>
        {confirmCompany && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeConfirm}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="lwd-card-glass p-8 max-w-sm w-full relative z-10 border-white/20 dark:border-white/10 shadow-2xl"
            >
              <div className={`
                 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm
                 ${confirmCompany.isActive 
                   ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" 
                   : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                 }
              `}>
                {confirmCompany.isActive ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
              </div>

              <h3 className="text-xl font-black text-slate-800 dark:text-white text-center mb-2 uppercase tracking-tight">
                {confirmCompany.isActive ? "Restrict Partner?" : "Authorize Partner?"}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8 leading-relaxed">
                You are about to <span className="font-bold">{confirmCompany.isActive ? "Block" : "Unblock"}</span> <span className="text-slate-900 dark:text-white font-black italic">"{confirmCompany.companyName}"</span>. 
                {confirmCompany.isActive ? " They will lose access to active recruitment tools." : " They will regain access to all recruitment features."}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  disabled={actionLoadingId}
                  onClick={closeConfirm}
                  className="px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border border-slate-100 dark:border-slate-800"
                >
                  Cancel
                </button>
                <button
                  disabled={actionLoadingId}
                  onClick={confirmAction}
                  className={`
                    px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-all
                    ${confirmCompany.isActive 
                      ? "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20" 
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                    }
                  `}
                >
                  {actionLoadingId ? "Processing..." : "Confirm Action"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}