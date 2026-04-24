import { CheckCircle, AlertCircle, XCircle, ShieldAlert } from "lucide-react";

const statusConfig = {
  ACTIVE: {
    label: "ACTIVE",
    className:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-100 dark:border-emerald-800/50",
    dotClass: "bg-emerald-500",
    icon: CheckCircle,
  },
  PENDING: {
    label: "PENDING",
    className:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-600 border border-amber-100 dark:border-amber-800/50",
    dotClass: "bg-amber-500",
    icon: AlertCircle,
  },
  REJECTED: {
    label: "REJECTED",
    className:
      "bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-100 dark:border-rose-800/50",
    dotClass: "bg-rose-500",
    icon: XCircle,
  },
  SUSPENDED: {
    label: "SUSPENDED",
    className:
      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
    dotClass: "bg-slate-500",
    icon: ShieldAlert,
  },
};

export default function CompanyStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.PENDING;
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${config.className}`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`}></div>
      <Icon size={12} />
      {config.label}
    </div>
  );
}