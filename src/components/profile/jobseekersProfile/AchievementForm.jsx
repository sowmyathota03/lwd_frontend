import { useState, useEffect } from "react";

function AchievementForm({
  achievement = "",
  onClose,
  onSave,
  loading: externalLoading,
}) {
  const [text, setText] = useState(achievement);
  const [internalLoading, setInternalLoading] = useState(false);

  const loading =
    externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    setText(achievement);
  }, [achievement]);

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      if (externalLoading === undefined) {
        setInternalLoading(true);
      }
      await onSave(text.trim());
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
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
          <h2 className="lwd-title">
            {achievement ? "Edit Achievement" : "Add Achievement"}
          </h2>
          <p className="lwd-text mt-1">
            {achievement
              ? "Update your achievement."
              : "Add a new achievement to your profile."}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="lwd-label mb-1 block">Achievement</label>

            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Won first prize in Hackathon 2023"
              className="lwd-input resize-y disabled:opacity-60"
              disabled={loading}
              autoFocus
            />

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {text.length} characters
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="lwd-btn-secondary disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !text.trim()}
              className="lwd-btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      fill="currentColor"
                      className="opacity-75"
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

export default AchievementForm;