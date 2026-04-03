import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyForJob } from "../../api/JobApplicationApi";
import { getJobById } from "../../api/JobApi";
import Loader from "../../components/common/Loader";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  FileText, 
  Code, 
  Globe, 
  ArrowLeft,
  Send,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Link2,
  CheckCircle2
} from "lucide-react";

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
        alert("Redirecting to external application...");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  if (loadingJob) return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader message="Loading job information..." />
    </div>
  );

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="lwd-card text-center p-12 max-w-md w-full space-y-6">
           <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Briefcase size={32} />
           </div>
           <p className="text-lg font-bold text-slate-800 dark:text-white">Job Not Found</p>
           <button onClick={() => navigate("/jobs")} className="lwd-btn-primary w-full h-12">Search Jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="lwd-page py-16 px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl space-y-10"
      >
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center">
          <motion.button
            variants={itemVariants}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors group/back"
          >
            <ArrowLeft size={16} className="group-hover/back:-translate-x-1 transition-transform" />
            Back to Jobs
          </motion.button>
        </div>

        {/* APPLICATION CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* JOB SUMMARY (LEFT) */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
             <div className="lwd-card p-8 space-y-6 text-left">
                <div>
                   <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-2">
                      {job.title}
                   </h1>
                   <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{job.company?.companyName || "Partner Organization"}</p>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{job.location}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Briefcase size={16} className="text-slate-400" />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{job.category || "Professional Role"}</span>
                   </div>
                </div>
                
                {job.applicationSource === "EXTERNAL" && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/50 space-y-2">
                    <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] uppercase tracking-wider">
                       <Info size={14} /> Note
                    </div>
                    <p className="text-[10px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                       This application is hosted on an external website. You will be redirected shortly.
                    </p>
                  </div>
                )}
             </div>
          </motion.div>

          {/* APPLICATION FORM (RIGHT) */}
          <motion.div variants={itemVariants} className="lg:col-span-8 overflow-hidden">
            <div className="lwd-card p-10 space-y-8 text-left">
              
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                 <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                    <FileText size={24} />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apply for Job</h2>
                    <p className="text-xs font-medium text-slate-500 mt-1">Please provide your professional information.</p>
                 </div>
              </div>

              {(job?.applicationSource === "PORTAL" || !job?.applicationSource) && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group/input">
                      <label className="lwd-label">Full Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={form.fullName}
                        onChange={handleChange}
                        className="lwd-input h-12"
                      />
                    </div>

                    <div className="space-y-2 group/input">
                      <label className="lwd-label">Email Address <span className="text-rose-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="lwd-input h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="lwd-label">Phone Number <span className="text-rose-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 0000 000 000"
                      value={form.phone}
                      onChange={handleChange}
                      className="lwd-input h-12"
                    />
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="lwd-label">Key Skills</label>
                    <input
                      type="text"
                      name="skills"
                      placeholder="e.g. React, Node.js, Python"
                      value={form.skills}
                      onChange={handleChange}
                      className="lwd-input h-12"
                    />
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="lwd-label">Cover Letter / Note</label>
                    <textarea
                      name="coverLetter"
                      rows="4"
                      placeholder="Share why you are the best fit for this role..."
                      value={form.coverLetter}
                      onChange={handleChange}
                      className="lwd-input min-h-[120px] py-4"
                    />
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="lwd-label">Portfolio / Resume Link</label>
                    <input
                      type="url"
                      name="resumeUrl"
                      placeholder="https://drive.google.com/resume.pdf"
                      value={form.resumeUrl}
                      onChange={handleChange}
                      className="lwd-input h-12 text-blue-600"
                    />
                  </div>
                </div>
              )}

              {/* ACTION UNIT */}
              <button
                onClick={handleApply}
                disabled={loading}
                className={`
                  lwd-btn-primary w-full h-14 flex items-center justify-center gap-2 group/btn
                  ${loading ? "opacity-70 cursor-wait" : ""}
                `}
              >
                {loading ? (
                   <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-l-2 border-current rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                   </div>
                ) : job.applicationSource === "EXTERNAL" ? (
                  <>
                    <span>Apply Directly on Website</span>
                    <ExternalLink size={18} />
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-[10px] font-medium text-slate-400 text-center">
                By clicking apply, you agree to our terms of service and professional evaluation policy.
              </p>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}

const MapPin = ({ className, size }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default ApplyJob;