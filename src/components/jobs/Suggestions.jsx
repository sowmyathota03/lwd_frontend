import React, { useEffect, useState } from "react";
import JobCard from "../../components/jobs/JobCards";
import { getAllJobs } from "../../api/SuggestionsApi";

function Suggestions() {
  const [jobs, setJobs] = useState([]);

  const handleApply = (job) => {
    console.log("Applied:", job.title);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getAllJobs();
      console.log(res.data); // debug
      setJobs(res.data.content);   // IMPORTANT
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Suggested Jobs</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
