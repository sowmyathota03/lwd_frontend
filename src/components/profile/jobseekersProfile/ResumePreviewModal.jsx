import { X, Download, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

function ResumePreviewModal({ resume, onClose }) {
  const [scale, setScale] = useState(1);

  if (!resume) return null;

  const fileUrl = resume.secureUrl;
  const fileName = resume.originalFileName || resume.fileName || "Resume";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.6));

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl h-[92vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
              Resume Preview
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {fileName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </button>

            <button
              onClick={zoomIn}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </button>

            <button
              onClick={handleDownload}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
              title="Download"
            >
              <Download size={18} />
            </button>

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
              title="Open in new tab"
            >
              <ExternalLink size={18} />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-gray-100 dark:bg-slate-950 overflow-auto">
          <div
            className="w-full h-full origin-top transition-transform duration-200"
            style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
          >
            <iframe
              src={fileUrl}
              title="Resume Preview"
              className="w-full h-[calc(92vh-80px)] bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePreviewModal;