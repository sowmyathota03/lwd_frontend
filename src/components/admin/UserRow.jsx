import React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle, 
  User, 
  Mail,
  Calendar,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";

const UserRow = React.memo(({ user, isLoading, openConfirm }) => {

  const statusStyles = {
    ACTIVE: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800/50",
    APPROVED: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800/50",
    PENDING_APPROVAL: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-100 dark:border-amber-800/50",
    BLOCKED: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-100 dark:border-rose-800/50",
    SUSPENDED: "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-100 dark:border-rose-800/50",
  };

  const roleColors = {
    ADMIN: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/50",
    RECRUITER_ADMIN: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50",
    RECRUITER: "text-violet-600 bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800/50",
    JOB_SEEKER: "text-slate-600 bg-slate-50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800/50",
  };

  return (
    <tr className="group/row hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all cursor-default">
      
      {/* Identity Column */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3 group/link">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover/row:text-blue-500 transition-all">
            <User size={18} />
          </div>
          <div>
            <Link
              to={`/profile/${user.id}`}
              className="text-sm font-black text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {user.name}
            </Link>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
              <Mail size={10} />
              {user.email}
            </div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-5">
        <div className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${roleColors[user.role] || "text-slate-400 border-slate-200"}`}>
          {user.role?.replace('_', ' ')}
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <div className={`
          inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
          ${statusStyles[user.status] || "bg-slate-50 text-slate-500 border-slate-100"}
        `}>
          <div className={`w-1.5 h-1.5 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500 animate-pulse" : user.status === "PENDING_APPROVAL" ? "bg-amber-500" : "bg-rose-500"}`}></div>
          {user.status?.replace('_', ' ')}
        </div>
      </td>

      {/* Timestamps */}
      <td className="px-6 py-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <Calendar size={10} className="text-slate-300" />
            Joined: {new Date(user.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric'})}
          </div>
          <div className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
            Audit: {new Date(user.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </td>

      {/* Operations */}
      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          
          {user.status === "PENDING_APPROVAL" && (
            <button
              disabled={isLoading}
              onClick={() => openConfirm(user, "approve")}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20 transition-all disabled:opacity-50"
            >
              <CheckCircle size={14} />
              Approve
            </button>
          )}

          <button
            disabled={isLoading || user.status === "APPROVED"}
            onClick={() => openConfirm(user, "block")}
            className={`
              inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
              ${user.status === "BLOCKED" || user.status === "SUSPENDED"
                ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20" 
                : "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-rose-100 dark:border-rose-800/20"
              }
              disabled:opacity-50
            `}
          >
            {isLoading ? (
               <MoreHorizontal size={14} className="animate-pulse" />
            ) : user.status === "BLOCKED" || user.status === "SUSPENDED" ? (
               <ShieldCheck size={14} />
            ) : (
               <ShieldAlert size={14} />
            )}
            {user.status === "BLOCKED" || user.status === "SUSPENDED" ? "Normalize" : "Restrict"}
          </button>

          <Link
            to={`/profile/${user.id}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            <ChevronRight size={18} />
          </Link>
        </div>
      </td>

    </tr>
  );
});

UserRow.displayName = "UserRow";

export default UserRow;