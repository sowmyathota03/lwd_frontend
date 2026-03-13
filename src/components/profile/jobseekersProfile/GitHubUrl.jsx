import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import GitHubUrlForm from "./GitHubUrlForm";

/**
 * GitHubUrl component – displays and edits the GitHub profile URL.
 *
 * @param {Object} props
 * @param {boolean} props.editable - Whether the current user can edit
 * @param {string} props.initialUrl - Current GitHub URL
 * @param {Function} props.onSave - Async function to save new URL
 */
function GitHubUrl({ editable, initialUrl, onSave }) {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">GitHub</h2>
        {editable && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            aria-label="Edit GitHub URL"
          >
            <svg
              className="w-4 h-4"
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
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          {url}
        </a>
      ) : (
        <p className="text-sm text-gray-500">
          {editable
            ? "No GitHub profile added. Click the edit button to add one."
            : "No GitHub profile provided."}
        </p>
      )}

      {/* Edit Modal */}
      {editing && (
        <GitHubUrlForm
          initialUrl={url}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default GitHubUrl;