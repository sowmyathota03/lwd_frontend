import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import { Bookmark, Search, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const handleRemoveJob = (jobId) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="lwd-page py-12 px-6">
      <div className="lwd-container max-w-5xl space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <h1 className="lwd-h2 flex items-center gap-3">
              <Bookmark className="text-blue-600" size={28} />
              Saved Jobs
            </h1>
            <p className="text-slate-500 font-medium">
              Manage the roles you've bookmarked for later application.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-400">
             <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {savedJobs.length} {savedJobs.length === 1 ? 'Job' : 'Jobs'} Saved
             </span>
          </div>
        </div>

        {/* CONTENT */}
        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {savedJobs.map((job) => (
              <div key={job.id} className="relative group">
                <JobCards job={job} />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveJob(job.id);
                  }}
                  className="absolute top-6 right-16 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lwd-card py-20 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">
              <Search size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">No saved jobs yet</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">
                Explore thousands of opportunities and save the ones that match your profile.
              </p>
            </div>
            <a 
              href="/jobs"
              className="lwd-btn-primary inline-flex items-center gap-2"
            >
              <Briefcase size={18} /> Browse All Jobs
            </a>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default SavedJobs;