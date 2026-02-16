import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsByRecruiter } from "../../api/RecruiterAdminApi";
import "./JobListPage.css";

export default function JobListPage() {
  const { recruiterId } = useParams(); // ✅ CORRECT
  console.log("Recruiter ID from URL:", recruiterId);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recruiterId) {
      fetchJobs();
    }
  }, [recruiterId]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobsByRecruiter(recruiterId);
      console.log("Fetched Jobs:", data);
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading jobs...</p>;

  return (
    <div className="job-list-container">
      <h2>Jobs Posted by Recruiter</h2>

      {error && <p className="error-text">{error}</p>}

      {jobs.length === 0 ? (
        <p className="empty-text">No jobs found</p>
      ) : (
        <table className="job-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Experience</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company?.companyName || "-"}</td>
                <td>{job.location}</td>
                <td>{job.minExperience} - {job.maxExperience} yrs</td>
                <td>{job.jobType}</td>
                <td>
                  <span className={`status ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
