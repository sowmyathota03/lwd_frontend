import React, { useState } from "react";

function ResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC/DOCX files allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    localStorage.setItem("resumeFileName", resumeFile.name);
    alert(`Resume uploaded successfully: ${resumeFile.name}`);
  };

  return (
    <div className="lwd-page flex flex-col items-center justify-center py-10 px-5">
      <div className="lwd-card p-8 max-w-md w-full text-center">
        <h1 className="lwd-title text-2xl mb-2">Upload Your Resume</h1>
        <p className="lwd-text mb-6">
          Upload your resume to apply for jobs in real-time.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="lwd-input"
          />

          {resumeFile && (
            <p className="lwd-text text-green-500">
              Uploaded: {resumeFile.name}
            </p>
          )}

          <button type="submit" className="lwd-btn-primary mt-2">
            Upload Resume
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResumeUpload;