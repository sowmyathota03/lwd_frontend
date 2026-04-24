// src/components/admin/AdminPlansForm.jsx
import { useEffect } from "react";

export default function AdminPlansForm({
  isOpen,
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading,
  editingId,
  error = null,
}) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onCancel();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity dark:bg-black/70"
        onClick={onCancel}
      ></div>

      {/* Modal panel */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="lwd-card relative w-full max-w-2xl transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 rounded-t-xl bg-gray-50/80 dark:bg-gray-800/80 dark:border-gray-700">
            <div>
              <h3 className="lwd-title text-lg font-semibold">
                {editingId ? "Edit Plan" : "Create New Plan"}
              </h3>
              <p className="lwd-text text-sm">
                {editingId
                  ? "Update plan details"
                  : "Add a new pricing plan"}
              </p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 transition-colors dark:text-gray-500 dark:hover:text-gray-400"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="px-6 py-5">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Plan Name */}
              <div>
                <label
                  htmlFor="modal-name"
                  className="lwd-label mb-1 block"
                >
                  Plan Name <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-name"
                  value={formData.name}
                  onChange={(e) =>
                    onChange({ ...formData, name: e.target.value })
                  }
                  className="lwd-input"
                  required
                >
                  <option value="">Select Plan</option>
                  <option value="FREE">FREE</option>
                  <option value="BASIC">BASIC</option>
                  <option value="STANDARD">STANDARD</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label
                  htmlFor="modal-type"
                  className="lwd-label mb-1 block"
                >
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-type"
                  value={formData.type}
                  onChange={(e) =>
                    onChange({ ...formData, type: e.target.value })
                  }
                  className="lwd-input"
                >
                  <option value="JOB_SEEKER">Job Seeker</option>
                  <option value="RECRUITER">Recruiter</option>
                   <option value="COMPANY_ADMIN">Company Admin</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="modal-price"
                  className="lwd-label mb-1 block"
                >
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    onChange({ ...formData, price: e.target.value })
                  }
                  className="lwd-input"
                  required
                />
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="modal-duration"
                  className="lwd-label mb-1 block"
                >
                  Duration (Days) <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-duration"
                  type="number"
                  min="1"
                  placeholder="30"
                  value={formData.durationDays}
                  onChange={(e) =>
                    onChange({ ...formData, durationDays: e.target.value })
                  }
                  className="lwd-input"
                  required
                />
              </div>
            </div>

            {/* Footer buttons */}
            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="lwd-btn-secondary px-4 py-2 text-sm font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="lwd-btn-primary px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </span>
                ) : editingId ? (
                  "Update Plan"
                ) : (
                  "Create Plan"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}