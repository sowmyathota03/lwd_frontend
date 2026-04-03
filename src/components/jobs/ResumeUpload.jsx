import { useState, useRef } from "react";

/**
 * ResumeUpload component – modal for uploading a new resume.
 *
 * @param {Object} props
 * @param {File|string} props.currentFile - Current resume file or file name/url
 * @param {Function} props.onClose - Function to close modal
 * @param {Function} props.onSave - Async function to save new file
 */
function ResumeUpload({ currentFile, onClose, onSave }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSave(selectedFile);
      onClose();
    } catch (err) {
      console.error("Failed to upload resume:", err);
      setError("Upload failed. Please try again.");
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
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {currentFile ? "Update Resume" : "Upload Resume"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Select a file to upload. Allowed formats: PDF, DOC, DOCX.
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Current file info */}
          {currentFile && (
            <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2">
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
              <span className="font-medium">Current file:</span> {currentFile.name || currentFile}
            </div>
          )}

          {/* File input */}
          <div>
            <label
              htmlFor="resume-upload"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Choose new file
            </label>
            <input
              type="file"
              id="resume-upload"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={loading}
            />
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Allowed formats: .pdf, .doc, .docx
            </p>
          </div>

          {/* Selected file preview */}
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <svg
                className="h-4 w-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Selected: {selectedFile.name}</span>
            </div>
          )}
        </div>

        {/* Action buttons (sticky footer) */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-slate-800 z-10">
          {/* <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button> */}
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-20 justify-center"
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
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;