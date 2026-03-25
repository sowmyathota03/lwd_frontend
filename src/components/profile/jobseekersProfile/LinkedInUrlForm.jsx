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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit LinkedIn URL</h2>
          <p className="modal-subtitle">
            Add or update your LinkedIn profile link.
          </p>
        </div>

        {/* Form */}
        <div className="modal-body space-y-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm dark:bg-red-900 dark:text-red-200 dark:border-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="linkedinUrl" className="form-label">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              id="linkedinUrl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.linkedin.com/in/username"
              className="input-field"
              disabled={loading}
              autoFocus
            />
          </div>

          {/* Action buttons */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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