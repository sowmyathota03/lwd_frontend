import { useEffect, useMemo, useState } from "react";
import {
  searchUsers,
  blockUser,
  unblockUser,
  approveRecruiter,
} from "../../api/AdminApi";
import UserTable from "./UserTable";
import ConfirmModal from "../common/ConfirmModal";
import { 
  Users, 
  Search, 
  Filter, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Activity,
  ShieldCheck,
  UserCheck,
  Lock,
  Mail,
  UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roleOptions = ["ADMIN", "RECRUITER_ADMIN", "RECRUITER", "JOB_SEEKER"];
const statusOptions = ["PENDING", "ACTIVE", "SUSPENDED", "BLOCKED"];

const formatLabel = (value) =>
  value
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [isActive, setIsActive] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [locked, setLocked] = useState("");

  const [confirmConfig, setConfirmConfig] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    setPage(0);
  }, [debouncedKeyword, role, status, isActive, emailVerified, locked]);

  const filters = useMemo(
    () => ({
      keyword: debouncedKeyword || null,
      role: role || null,
      status: status || null,
      isActive: isActive === "" ? null : isActive === "true",
      emailVerified: emailVerified === "" ? null : emailVerified === "true",
      locked: locked === "" ? null : locked === "true",
    }),
    [debouncedKeyword, role, status, isActive, emailVerified, locked]
  );

  const hasActiveFilters = !!(
    keyword.trim() ||
    role ||
    status ||
    isActive !== "" ||
    emailVerified !== "" ||
    locked !== ""
  );

  const loadUsers = async (pageNumber = page) => {
    try {
      setLoading(true);
      const data = await searchUsers(filters, pageNumber, size);

      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);
      setPage(data.pageNumber ?? data.page ?? pageNumber);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page, filters]);

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const openConfirm = (user, type) => {
    setConfirmConfig({ user, type });
  };

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmConfig(null);
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const handleBlockUnblock = async (user) => {
    try {
      setActionLoadingId(user.id);

      if (user.status === "SUSPENDED" || user.status === "BLOCKED") {
        await unblockUser(user.id);
        updateUserStatus(user.id, "ACTIVE");
      } else {
        await blockUser(user.id);
        updateUserStatus(user.id, "SUSPENDED");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  const handleApprove = async (user) => {
    try {
      setActionLoadingId(user.id);
      await approveRecruiter(user.id);
      updateUserStatus(user.id, "ACTIVE");
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  const confirmAction = async () => {
    if (!confirmConfig) return;

    const { user, type } = confirmConfig;

    if (type === "block") {
      await handleBlockUnblock(user);
    } else {
      await handleApprove(user);
    }
  };

  const clearFilters = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setRole("");
    setStatus("");
    setIsActive("");
    setEmailVerified("");
    setLocked("");
    setPage(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="lwd-page min-h-screen py-12 px-6 relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-10 relative z-10"
      >
        
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
              <Users size={12} />
              Admin Control
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              User <span className="text-blue-600 italic underline decoration-blue-500/20 underline-offset-8">Intelligence</span>
            </h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2 tabular-nums">
            <Activity size={14} className="text-blue-500" />
            Active Records: {users.length * totalPages || 0}
          </p>
        </div>

        {/* Global Filter Suite */}
        <div className="lwd-card-glass p-8 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
            
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search user profiles, identities, or encrypted emails..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="lwd-input pl-12 py-3.5 bg-white/50 border-slate-200/50 focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              />
            </div>

            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-rose-100 dark:border-rose-800/20 transition-all shrink-0"
                >
                  <X size={14} />
                  Reset Filters
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                <ShieldCheck size={10} /> Role Access
              </label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="lwd-input font-bold text-xs bg-white/50 border-slate-200/50">
                <option value="">All Tiers</option>
                {roleOptions.map((item) => (
                  <option key={item} value={item}>{formatLabel(item)}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                <Activity size={10} /> Current Status
              </label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="lwd-input font-bold text-xs bg-white/50 border-slate-200/50">
                <option value="">Full Spectrum</option>
                {statusOptions.map((item) => (
                  <option key={item} value={item}>{formatLabel(item)}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                <UserCheck size={10} /> Activity Flow
              </label>
              <select value={isActive} onChange={(e) => setIsActive(e.target.value)} className="lwd-input font-bold text-xs bg-white/50 border-slate-200/50">
                <option value="">All Activity</option>
                <option value="true">Live Sessions</option>
                <option value="false">Dormant Account</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                <Mail size={10} /> Authentication
              </label>
              <select value={emailVerified} onChange={(e) => setEmailVerified(e.target.value)} className="lwd-input font-bold text-xs bg-white/50 border-slate-200/50">
                <option value="">Trust Level</option>
                <option value="true">Identity Verified</option>
                <option value="false">Pending Validation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                <Lock size={10} /> Security Lock
              </label>
              <select value={locked} onChange={(e) => setLocked(e.target.value)} className="lwd-input font-bold text-xs bg-white/50 border-slate-200/50">
                <option value="">System Lock</option>
                <option value="true">Restricted</option>
                <option value="false">Standard Access</option>
              </select>
            </div>

          </div>
        </div>

        {/* Dynamic User Table */}
        <UserTable
          users={users}
          loading={loading}
          actionLoadingId={actionLoadingId}
          openConfirm={openConfirm}
        />

        {/* Global Pagination Console */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 shadow-sm transition-all hover:shadow-md">
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Navigating View</span>
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
               Next Page
               <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
             </button>
          </div>
        </div>

      </motion.div>

      {/* Common Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmConfig}
        title={
          confirmConfig?.type === "block"
            ? confirmConfig.user.status === "SUSPENDED" || confirmConfig.user.status === "BLOCKED"
              ? "Normalize Access?"
              : "Restrict Access?"
            : "Authorize User?"
        }
        message={
          confirmConfig
            ? `You are about to initiate ${confirmConfig.type === "block"
              ? confirmConfig.user.status === "SUSPENDED" || confirmConfig.user.status === "BLOCKED"
                ? "restoration"
                : "restriction"
              : "authorization"
            } protocols for user: "${confirmConfig.user.name}". Please confirm management clearance.`
            : ""
        }
        confirmText={confirmConfig?.type === "block" ? (confirmConfig.user.status === "SUSPENDED" || confirmConfig.user.status === "BLOCKED" ? "Unblock User" : "Block User") : "Approve User"}
        onConfirm={confirmAction}
        onCancel={closeConfirm}
        loading={!!actionLoadingId}
      />
    </div>
  );
}