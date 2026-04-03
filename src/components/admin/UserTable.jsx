import UserRow from "./UserRow";
import Loader from "../common/Loader";
import { User, Mail, Shield, Activity, Calendar, Settings } from "lucide-react";

export default function UserTable({
  users,
  loading,
  actionLoadingId,
  openConfirm,
  onApprove,
}) {
  if (loading && users.length === 0) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader fullScreen={false} />
      </div>
    );
  }

  return (
    <div className="lwd-card-glass p-0 overflow-hidden group">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-800/50">
            <tr>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-2">
                  <User size={12} />
                  Identity
                </div>
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-2">
                  <Shield size={12} />
                  Role
                </div>
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-2">
                  <Activity size={12} />
                  Status
                </div>
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={12} />
                  Timeline
                </div>
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Settings size={12} />
                  Operations
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-24 text-center text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic"
                >
                  No user records match the current filters
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isLoading={actionLoadingId === user.id}
                  openConfirm={openConfirm}
                  onApprove={onApprove}
                />
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}