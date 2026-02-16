import { useEffect, useState } from "react";
import JobActions from "./JobActions";
import axios from "axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:8080/api/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>Status: {job.status}</p>

          <JobActions
            jobId={job.id}
            currentStatus={job.status}
            refresh={fetchJobs}
          />
        </div>
      ))}
    </div>
  );
}
