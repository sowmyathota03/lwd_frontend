import { useState, useEffect } from "react";
import { Pencil, FileText, Eye, Loader2 } from "lucide-react";
import ResumeUploadForm from "./ResumeUploadForm";
import ResumePreviewModal from "./ResumePreviewModal";
import { getMyResumes, uploadResume } from "../../../api/resumeApi";

function ResumeUpload({ editable = false }) {
  const [resume, setResume] = useState(null);
  const [editing, setEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadResume = async () => {
    try {
      setLoading(true);
      setError("");

      const resumes = await getMyResumes();
      const defaultResume =
        resumes?.find((item) => item.isDefault) || resumes?.[0] || null;

      setResume(defaultResume);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
      setError(err?.response?.data?.message || "Failed to load resume.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  const handleSave = async (newFile, makeDefault) => {
    try {
      setSaving(true);
      setError("");

      const response = await uploadResume(newFile, makeDefault);
      const savedResume = response?.data || response;

      setResume(savedResume);
      setEditing(false);
      return savedResume;
    } catch (err) {
      console.error("Failed to upload resume:", err);
      const message =
        err?.response?.data?.message || "Failed to upload resume.";
      setError(message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading resume...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 space-y-4 transition-colors">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Resume
          </h2>

          {editable && resume && (
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Edit resume"
              disabled={saving}
            >
              <Pencil size={18} />
            </button>
          )}
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {resume ? (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-700/50 p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-600">
                <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 break-all">
                  {resume.originalFileName || resume.fileName || "Resume"}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {resume.fileFormat?.toUpperCase() || "FILE"}
                  {resume.fileSize
                    ? ` • ${(resume.fileSize / 1024 / 1024).toFixed(2)} MB`
                    : ""}
                </p>

                {resume.isDefault && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Default Resume
                  </span>
                )}

                {resume.secureUrl && (
                  <div className="mt-3">
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Eye size={16} />
                      Preview Resume
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {editable
              ? "No resume uploaded. Click below to upload your resume."
              : "No resume provided."}
          </p>
        )}

        {editable && !resume && (
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium transition-colors"
            disabled={saving}
          >
            Upload Resume
          </button>
        )}

        {editing && (
          <ResumeUploadForm
            currentResume={resume}
            onClose={() => setEditing(false)}
            onSave={handleSave}
            loading={saving}
          />
        )}
      </div>

      {previewOpen && resume && (
        <ResumePreviewModal
          resume={resume}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </>
  );
}

export default ResumeUpload;