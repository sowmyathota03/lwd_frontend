import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../api/JobApi";
import Loader from "../../components/jobs/Loader";
import styles from "../../components/jobs/JobCard.module.css";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleApplyClick = () => {
    // Navigate to the ApplyJob page for this job
    navigate(`/apply/${job.id}`);
  };

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!job) return <p style={{ textAlign: "center" }}>No job found.</p>;

  const tagStyle = {
    background: "#f1f3f5",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#333",
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      
      {/* ====== Job Card Top Section ====== */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <div style={{display : "flex", justifyContent: "space-between"}}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px", color: "#222" }}>
            {job.title}
          </h1>
          <button className={styles.applyBtn} onClick={handleApplyClick}>
            Apply Now
          </button>
        </div>

        <p style={{ color: "#555", marginBottom: "12px", fontSize: "16px" }}>
          {job.company?.companyName || job.company} • {job.location}
        </p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span style={tagStyle}>
            {job.minExperience} - {job.maxExperience} Years
          </span>
          <span style={tagStyle}>{job.jobType}</span>
          <span style={tagStyle}>{job.industry}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
          <span style={{ fontSize: "14px", color: "#888" }}>
            Posted on {new Date(job.createdAt).toLocaleDateString("en-IN")}
          </span>
          <span style={{ fontWeight: "600", fontSize: "16px", color: "#0d6efd" }}>
            {job.salary ? `₹${job.salary.toLocaleString()}` : "Not Disclosed"}
          </span>
        </div>
      </div>

      {/* ====== Job Description Bottom Section ====== */}
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ fontSize: "22px", marginBottom: "15px", color: "#222" }}>
          Job Description
        </h2>
        <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#555" }}>
          {job.description}
        </p>
      </div>
    </div>
  );
}

export default JobDetails;
