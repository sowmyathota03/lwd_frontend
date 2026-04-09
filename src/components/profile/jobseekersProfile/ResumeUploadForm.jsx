import { useState, useRef } from "react";

function ResumeUploadForm({ currentResume, onClose, onSave, loading = false }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [makeDefault, setMakeDefault] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const validateFile = (file) => {
    if (!file) return "Please select a file.";
    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, DOC, and DOCX files are allowed.";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File size must be less than 5 MB.";
    }
    return "";
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setSelectedFile(null);
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError("");
  };

  const handleSave = async () => {
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError("");
      await onSave(selectedFile, makeDefault);
      onClose();
    } catch (err) {
      console.error("Failed to upload resume:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Upload failed. Please try again."
      );
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
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {currentResume ? "Update Resume" : "Upload Resume"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Select a PDF, DOC, or DOCX file up to 5 MB.
          </p>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {currentResume && (
            <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-200">
              <span className="font-medium">Current file: </span>
              {currentResume.originalFileName || currentResume.fileName || "Resume"}
            </div>
          )}

          <div>
            <label
              htmlFor="resume-upload"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Choose file
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

          {selectedFile && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">Selected:</span>
              <span className="break-all">{selectedFile.name}</span>
            </div>
          )}

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={makeDefault}
              onChange={(e) => setMakeDefault(e.target.checked)}
              className="rounded"
              disabled={loading}
            />
            Make this my default resume
          </label>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-slate-800 z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-24 justify-center"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResumeUploadForm;