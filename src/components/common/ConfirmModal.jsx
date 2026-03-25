import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
        >

          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="lwd-card w-96 max-w-[92%] max-h-[80vh] p-6 rounded-2xl shadow-2xl flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >

            {/* Title */}
            <h3 className="lwd-title mb-3">
              {title}
            </h3>

            {/* Message */}
            <p className="lwd-text mb-6">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">

              <button
                onClick={onCancel}
                disabled={loading}
                className="lwd-btn-secondary disabled:opacity-50"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="lwd-btn-primary disabled:opacity-50"
              >
                {loading ? "Please wait..." : confirmText}
              </button>

            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}