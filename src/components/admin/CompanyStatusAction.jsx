import { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle,
  XCircle,
  RefreshCcw,
  Activity,
} from "lucide-react";
import CompanyStatusConfirmModal from "./CompanyStatusConfirmModal";
import { updateCompanyStatus } from "../../api/AdminApi";

const actionMap = {
  PENDING: [
    {
      key: "approve",
      label: "Approve",
      status: "ACTIVE",
      icon: CheckCircle,
      className:
        "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20",
    },
    {
      key: "reject",
      label: "Reject",
      status: "REJECTED",
      icon: XCircle,
      className:
        "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-rose-100 dark:border-rose-800/20",
    },
  ],
  ACTIVE: [
    {
      key: "suspend",
      label: "Suspend",
      status: "SUSPENDED",
      icon: ShieldAlert,
      className:
        "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 border border-amber-100 dark:border-amber-800/20",
    },
  ],
  SUSPENDED: [
    {
      key: "reactivate",
      label: "Reactivate",
      status: "ACTIVE",
      icon: ShieldCheck,
      className:
        "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/20",
    },
  ],
  REJECTED: [
    {
      key: "moveToPending",
      label: "Move to Pending",
      status: "PENDING",
      icon: RefreshCcw,
      className:
        "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-100 dark:border-blue-800/20",
    },
  ],
};

export default function CompanyStatusAction({
  company,
  onStatusUpdated,
}) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(false);

  const actions = actionMap[company.status] || [];

  const handleConfirm = async () => {
    if (!selectedAction) return;

    try {
      setLoading(true);
      await updateCompanyStatus(company.id, selectedAction.status);
      onStatusUpdated(company.id, selectedAction.status);
      setSelectedAction(null);
    } catch (error) {
      console.error("Failed to update company status", error);
    } finally {
      setLoading(false);
    }
  };

  if (actions.length === 0) return null;

  return (
    <>
      <div className="flex justify-end gap-2 flex-wrap">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              onClick={() => setSelectedAction(action)}
              disabled={loading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 ${action.className}`}
            >
              {loading ? <Activity size={14} className="animate-spin" /> : <Icon size={14} />}
              {action.label}
            </button>
          );
        })}
      </div>

      <CompanyStatusConfirmModal
        company={company}
        action={selectedAction}
        loading={loading}
        onClose={() => !loading && setSelectedAction(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
}