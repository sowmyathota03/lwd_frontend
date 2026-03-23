import { useState, useEffect } from "react";

function CareerObjectiveForm({ objective, onClose, onSave }) {
  const [text, setText] = useState(objective || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setText(objective || "");
  }, [objective]);

  const handleSave = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      await onSave(text.trim());
      onClose();
    } catch (err) {
      console.error("Failed to save career objective:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="lwd-card w-full max-w-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h2 className="lwd-title">Edit Career Objective</h2>
          <p className="lwd-text mt-1">
            Write a brief summary of your career goals and aspirations.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm dark:bg-red-900/30 dark:border-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Textarea */}
          <div>
            <label className="lwd-label mb-1 block">
              Career Objective
            </label>
            <textarea
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. To leverage my skills in software development..."
              className="lwd-input resize-y disabled:opacity-60"
              disabled={loading}
            />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {text.length} characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="lwd-btn-secondary disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading || !text.trim()}
              className="lwd-btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 
                      0 0 5.373 0 12h4zm2 5.291A7.962 
                      7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerObjectiveForm;