import { useState, useEffect } from "react";

function GitHubUrlForm({ initialUrl, onClose, onSave }) {
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
      console.error("Failed to save GitHub URL:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit GitHub URL</h2>
          <p className="modal-subtitle">
            Add or update your GitHub profile link.
          </p>
        </div>

        {/* Body */}
        <div className="modal-body">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="form-label">GitHub Profile URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username"
              className="input-field"
              disabled={loading}
              autoFocus
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
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
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8V0"
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
  );
}

export default GitHubUrlForm;