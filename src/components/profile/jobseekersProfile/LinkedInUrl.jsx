import { useState, useEffect } from "react";
import LinkedInUrlForm from "./LinkedInUrlForm";

/**
 * LinkedInUrl component – displays and edits the LinkedIn profile URL.
 *
 * @param {Object} props
 * @param {boolean} props.editable - Whether the current user can edit
 * @param {string} props.initialUrl - Current LinkedIn URL
 * @param {Function} props.onSave - Async function to save new URL
 */
function LinkedInUrl({ editable, initialUrl, onSave }) {
  const [url, setUrl] = useState(initialUrl || "");
  const [editing, setEditing] = useState(false);

  // Sync with prop changes
  useEffect(() => {
    setUrl(initialUrl || "");
  }, [initialUrl]);

  const handleSave = async (newUrl) => {
    await onSave(newUrl);
    setUrl(newUrl);
    setEditing(false);
  };

  return (
    <div className="lwd-card space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="lwd-title">LinkedIn</h2>
        {editable && (
          <button
            onClick={() => setEditing(true)}
            className="lwd-btn-secondary flex items-center gap-2 px-3 py-1.5 text-sm font-medium"
            aria-label="Edit LinkedIn URL"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Edit
          </button>
        )}
      </div>

      {/* Content */}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="lwd-link flex items-center gap-1"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.222 0h.003z" />
          </svg>
          {url}
        </a>
      ) : (
        <p className="lwd-text">
          {editable
            ? "No LinkedIn profile added. Click the edit button to add one."
            : "No LinkedIn profile provided."}
        </p>
      )}

      {/* Edit Modal */}
      {editing && (
        <LinkedInUrlForm
          initialUrl={url}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default LinkedInUrl;