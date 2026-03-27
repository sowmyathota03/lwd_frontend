import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyForJob } from "../../api/JobApplicationApi";
import { getJobById } from "../../api/JobApi";
import Loader from "../../components/common/Loader";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loadingJob, setLoadingJob] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    coverLetter: "",
    resumeUrl: "",
  });

  const [loading, setLoading] = useState(false);

  // FETCH JOB
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
      } catch (err) {
        alert("Failed to load job details.");
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // APPLY
  const handleApply = async () => {
    if (!job) return;

    if (job.applicationSource === "PORTAL") {
      if (!form.fullName || !form.email || !form.phone) {
        alert("Full Name, Email, and Phone are required.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = { jobId, ...form };
      const response = await applyForJob(payload);
      const result = response.data;

      if (job.applicationSource === "EXTERNAL") {
        alert("Redirecting...");
        window.open(result, "_blank");
        navigate(`/jobs/${jobId}`);
        return;
      }

      alert(result || "Application submitted successfully");
      navigate(`/jobs/${jobId}`);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Please complete your profile before applying.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingJob) return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50 dark:bg-slate-900 transition-colors">
      <Loader />
    </div>
  );

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-slate-50 dark:bg-slate-900 transition-colors">
        <p className="text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-md w-full text-slate-500 dark:text-slate-400 font-medium">
          Job not found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 py-16 min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">

      <div className="w-full max-w-xl bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700/60 relative overflow-hidden group">
        
        {/* Decorative Graphic Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="relative z-10 inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-6 group/back"
        >
          <svg className="w-4 h-4 mr-1.5 transform group-hover/back:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Job Details
        </button>

        {/* JOB INFO */}
        <div className="text-center mb-8 relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm border border-blue-100 dark:border-blue-800/50">
            Submit Application
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
            {job.title}
          </h2>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <span className="text-slate-700 dark:text-slate-300 font-bold">{job.company?.companyName || "Company"}</span> 
            <span>•</span> 
            {job.location}
          </p>
        </div>

        {/* EXTERNAL NOTICE */}
        {job.applicationSource === "EXTERNAL" && (
          <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800/50 flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">
              This job requires an external application. Clicking apply will redirect you to the company's official posting.
            </p>
          </div>
        )}

        {/* FORM */}
        {(job?.applicationSource === "PORTAL" || !job?.applicationSource) && (
          <div className="flex flex-col gap-5 relative z-10">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 234 567 890"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Core Skills <span className="text-slate-400 text-[10px]">(Comma separated)</span></label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. React, Node.js, Python"
                value={form.skills}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Cover Letter</label>
              <textarea
                name="coverLetter"
                placeholder="Why are you a great fit for this role?"
                value={form.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium min-h-[120px] resize-y"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1">Portfolio / Resume URL</label>
              <input
                type="url"
                name="resumeUrl"
                placeholder="https://yourwebsite.com/resume"
                value={form.resumeUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-medium"
              />
            </div>

          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleApply}
          disabled={loading}
          className="mt-8 relative z-10 w-full flex items-center justify-center py-4 px-8 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          {loading ? (
             <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing Application...
             </span>
            ) : job.applicationSource === "EXTERNAL" ? (
              <span className="flex items-center gap-2">
                Apply Directly
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </span>
            ) : (
              "Submit Application"
            )}
        </button>

      </div>
    </div>
  );
}

export default ApplyJob;