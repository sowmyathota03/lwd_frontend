import { useState, useEffect } from "react";

/**
 * LinkedInUrlForm component – modal for editing LinkedIn URL.
 *
 * @param {Object} props
 * @param {string} props.initialUrl - Current URL
 * @param {Function} props.onClose - Function to close modal
 * @param {Function} props.onSave - Async function to save new URL
 */
function LinkedInUrlForm({ initialUrl, onClose, onSave }) {
  const [url, setUrl] = useState(initialUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUrl(initialUrl || "");
  }, [initialUrl]);

  const handleSave = async () => {
    if (!url.trim()) {
      setError("URL cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSave(url.trim());
      onClose();
    } catch (err) {
      console.error("Failed to save LinkedIn URL:", err);
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
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit LinkedIn URL</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add or update your LinkedIn profile link.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              id="linkedinUrl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
              autoFocus
            />
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
              disabled={loading}
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

export default LinkedInUrlForm;