import { AnimatePresence, motion } from "framer-motion";

export default function CompanyStatusConfirmModal({
  company,
  action,
  loading,
  onClose,
  onConfirm,
}) {
  return (
    <AnimatePresence>
      {action && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="lwd-card-glass p-8 max-w-sm w-full relative z-10 border-white/20 dark:border-white/10 shadow-2xl"
          >
            <h3 className="text-xl font-black text-slate-800 dark:text-white text-center mb-3 uppercase tracking-tight">
              Change Company Status?
            </h3>

            <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-8 leading-relaxed">
              You are about to change{" "}
              <span className="font-black text-slate-900 dark:text-white">
                {company.companyName}
              </span>{" "}
              to <span className="font-black">{action.label}</span>.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={loading}
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors border border-slate-100 dark:border-slate-800"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={onConfirm}
                className="px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}