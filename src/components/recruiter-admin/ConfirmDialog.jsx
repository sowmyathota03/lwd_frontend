import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="lwd-card w-full max-w-md"
          >
            {/* Title */}
            <h3 className="lwd-title text-lg">
              {title}
            </h3>

            {/* Message */}
            <p className="lwd-text mt-3">
              {message}
            </p>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={onCancel}
                disabled={loading}
                className="lwd-btn-secondary"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="lwd-btn-danger"
              >
                {loading ? "Processing..." : confirmText}
              </button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}