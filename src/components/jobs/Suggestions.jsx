import React, { useState, useEffect } from "react";
import JobCards from "./JobCards";
import { Sparkles, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";

function Suggestions() {
  const [suggestedJobs, setSuggestedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API loading for demonstration
    const timer = setTimeout(() => {
      const jobs = JSON.parse(localStorage.getItem("allJobs")) || [];
      // Just show 3-4 random jobs as "suggestions"
      setSuggestedJobs(jobs.slice(0, 4));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lwd-page py-12 px-6">
      <div className="lwd-container max-w-5xl space-y-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-2">
            <h1 className="lwd-h2 flex items-center gap-3">
              <Sparkles className="text-blue-600" size={28} />
              Recommended for You
            </h1>
            <p className="text-slate-500 font-medium">
              Top opportunities synthesized based on your profile and professional history.
            </p>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Synthesizing Recommendations...
            </p>
          </div>
        ) : suggestedJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {suggestedJobs.map((job) => (
              <JobCards key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="lwd-card py-20 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300">
              <Search size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">No recommendations yet</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto">
                Update your profile registry to unlock personalized career insights.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Suggestions;