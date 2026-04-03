import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Loader2 } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onCancel();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="lwd-card max-w-sm w-full relative z-10 shadow-2xl flex flex-col hover:shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mx-auto mb-5">
              <AlertCircle size={28} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-800 dark:text-white text-center mb-2">
              {title}
            </h3>

            {/* Message */}
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center mb-7 leading-relaxed">
              {message}
            </p>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="lwd-btn-secondary py-2.5 disabled:opacity-50"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="lwd-btn-primary py-2.5 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={15} className="animate-spin" />}
                {loading ? "Processing..." : confirmText}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}