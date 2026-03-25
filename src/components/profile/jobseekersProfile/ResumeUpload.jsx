import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import ResumeUploadForm from "./ResumeUploadForm";

/**
 * ResumeUpload component – displays and edits the resume file.
 *
 * @param {Object} props
 * @param {boolean} props.editable - Whether the current user can edit
 * @param {File|string} props.initialFile - Current resume file or file name/url
 * @param {Function} props.onSave - Async function to save new file
 */
function ResumeUpload({ editable, initialFile, onSave }) {
  const [file, setFile] = useState(initialFile || null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setFile(initialFile || null);
  }, [initialFile]);

  const handleSave = async (newFile) => {
    await onSave(newFile);
    setFile(newFile);
    setEditing(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-4 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Resume
        </h2>
        {editable && file && (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Edit resume"
          >
            <Pencil size={18} />
          </button>
        )}
      </div>

      {/* Current file display */}
      {file ? (
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
          <svg
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2-10H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
            />
          </svg>
          <span className="font-medium">{file.name || file}</span>
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {editable
            ? "No resume uploaded. Click the button below to upload."
            : "No resume provided."}
        </p>
      )}

      {/* Upload button (if editable and no file) */}
      {editable && !file && (
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium transition-colors"
        >
          Upload Resume
        </button>
      )}

      {/* Edit Modal */}
      {editing && (
        <ResumeUploadForm
          currentFile={file}
          onClose={() => setEditing(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ResumeUpload;