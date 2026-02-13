import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyForJob } from "../../api/JobApplicationApi";
import { getJobById } from "../../api/JobApi";
import styles from "./ApplyJob.module.css";
import Loader from "../jobs/Loader";

function ApplyJob() {
  const { jobId } = useParams(); // Get jobId from URL
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH JOB DETAILS =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load job details.");
      } finally {
        setLoadingJob(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    if (!fullName || !email || !phone) {
      alert("Full Name, Email, and Phone are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await applyForJob({
        jobId,
        fullName,
        email,
        phone,
        skills,
        coverLetter,
        resumeUrl,
      });
      alert(response.data); // Job application submitted successfully
      navigate(`/jobs/${jobId}`); // Go back to job details after applying
    } catch (err) {
      console.error(err);
      alert("Failed to apply for job.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingJob) return <Loader />;
  if (!job) return <p style={{ textAlign: "center" }}>Job not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {/* ======= Back Button ======= */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Job Details
        </button>

        {/* ======= Job Info ======= */}
        <div className={styles.jobInfo}>
          <h2>{job.title}</h2>
          <p className={styles.company}>
            {job.company?.companyName || job.company} • {job.location}
          </p>
        </div>

        <p className={styles.subtitle}>
          Fill in your details and submit your application
        </p>

        {/* ======= Application Form ======= */}
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className={styles.textarea}
          />
          <input
            type="text"
            placeholder="Resume URL"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className={styles.input}
          />

          <button
            onClick={handleApply}
            className={styles.applyBtn}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
