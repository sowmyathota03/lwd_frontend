import React, { useEffect, useState } from "react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);
    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="lwd-page py-10 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <h2 className="lwd-title text-3xl mb-8">Saved Jobs</h2>

        {savedJobs.length === 0 ? (
          <p className="lwd-text text-lg">No saved jobs yet.</p>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <div key={job.id} className="lwd-card p-6 lwd-card-hover">

                {/* Job Title */}
                <h3 className="lwd-title text-xl">{job.title}</h3>

                {/* Company Info */}
                <div className="flex items-center gap-3 mt-2">
                  {job.company?.logo && (
                    <img
                      src={job.company.logo}
                      alt={job.company.companyName}
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <p className="lwd-text">{job.company?.companyName}</p>
                </div>

                {/* Location */}
                <p className="lwd-text text-sm mt-1">{job.location}</p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button className="lwd-btn-primary">
                    Apply Now
                  </button>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="lwd-btn-secondary"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;