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
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Saved Jobs
        </h2>

        {savedJobs.length === 0 ? (
          <p className="text-gray-500 text-lg">
            No saved jobs yet.
          </p>
        ) : (
          <div className="space-y-6">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {job.company}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  {job.location}
                </p>

                <div className="flex gap-4 mt-4">

                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Apply Now
                  </button>

                  <button
                    onClick={() => removeJob(job.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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