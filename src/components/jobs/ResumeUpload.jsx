import React, { useState } from "react";

function ResumeUpload() {
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",];

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
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Upload Your Resume</h1>
      <p>Upload your resume to apply for jobs in real-time.</p>

      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ marginBottom: "20px" }}/>
        {resumeFile && (
          <p style={{ color: "green" }}>Uploaded: {resumeFile.name}</p>
          )}

        <button type="submit"
          style={{ padding: "10px 10px",backgroundColor: "#2563eb",color: "white",border: "none",borderRadius: "6px",cursor: "pointer",
          }}>Upload Resume</button>
      </form>
    </div>
  );
}

export default ResumeUpload;
