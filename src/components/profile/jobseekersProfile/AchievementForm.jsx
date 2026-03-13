import { useState, useEffect } from "react";

/**
 * AchievementForm component - Modal for adding/editing an achievement
 *
 * @param {Object} props
 * @param {string} props.achievement - Current achievement text (empty for new)
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSave - Callback with new text
 * @param {boolean} props.loading - External loading state
 */
function AchievementForm({ achievement = "", onClose, onSave, loading: externalLoading }) {
  const [text, setText] = useState(achievement);
  const [internalLoading, setInternalLoading] = useState(false);

  const loading = externalLoading !== undefined ? externalLoading : internalLoading;

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
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {achievement ? "Edit Achievement" : "Add Achievement"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {achievement
              ? "Update your achievement."
              : "Add a new achievement to your profile."}
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <div>
            <label htmlFor="achievement" className="block text-sm font-medium text-gray-700 mb-1">
              Achievement
            </label>
            <textarea
              id="achievement"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Won first prize in Hackathon 2023"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-y disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
              autoFocus
            />
            <p className="text-xs text-gray-400 mt-1">
              {text.length} characters
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading || !text.trim()}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-20 justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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