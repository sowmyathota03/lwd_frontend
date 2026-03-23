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
      setJobs(res.data.content); // IMPORTANT
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="lwd-page py-10 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="lwd-title text-2xl font-semibold mb-6">
          Suggested Jobs
        </h2>

        {jobs && jobs.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={handleApply}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="lwd-text text-lg">No jobs available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Suggestions;