import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyForJob } from "../../api/JobApplicationApi";
import { getJobById } from "../../api/JobApi";
import Loader from "../../components/common/Loader";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Briefcase,
  FileText,
  ArrowLeft,
  Send,
  ExternalLink,
  CheckCircle2,
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

  // 🔥 FETCH JOB
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
      } catch (err) {
        toast.error("Failed to load job details");
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // 🔥 INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 APPLY
 const handleApply = async () => {
  if (!job) return;

  if (job.applicationSource === "PORTAL") {
    if (!form.fullName || !form.email || !form.phone) {
      toast.error("Full Name, Email, and Phone are required");
      return;
    }
  }

  setLoading(true);

  try {
    const payload = { jobId, ...form };
    const response = await applyForJob(payload);
    const result = response.data;

    if (job.applicationSource === "EXTERNAL") {
      toast.success("Redirecting to external site...");
      window.open(result, "_blank");

      setTimeout(() => {
        navigate(`/jobs/${jobId}`);
      }, 1200);

      return;
    }

    const successMessage =
      typeof result === "string"
        ? result
        : result?.message || "Application submitted successfully";

    toast.success(successMessage);

    setTimeout(() => {
      navigate(`/jobs/${jobId}`);
    }, 1500);
  } catch (err) {
    console.error("Apply job error:", err?.response?.data);

    toast.error(
      getErrorMessage(err, "Please complete your profile before applying.")
    );
  } finally {
    setLoading(false);
  }
};

 const getErrorMessage = (err, fallback = "Something went wrong") => {
  const data = err?.response?.data;

  if (!data) return fallback;

  if (typeof data === "string") return data;

  if (typeof data.message === "string") return data.message;

  if (typeof data.error === "string") return data.error;

  return fallback;
};

  if (loadingJob) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader message="Loading job information..." />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="lwd-card text-center p-12 max-w-md w-full space-y-6">
          <Briefcase size={32} className="mx-auto text-slate-400" />
          <p className="text-lg font-bold">Job Not Found</p>
          <button
            onClick={() => navigate("/jobs")}
            className="lwd-btn-primary w-full h-12"
          >
            Search Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lwd-page py-16 px-6">
      <motion.div className="mx-auto max-w-4xl space-y-10">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="lwd-card p-10 space-y-6">
          <h2 className="text-xl font-bold">Apply for Job</h2>

          {/* FORM */}
          <div className="space-y-4">
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="lwd-input h-12"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="lwd-input h-12"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="lwd-input h-12"
            />

            <input
              name="skills"
              placeholder="Skills"
              value={form.skills}
              onChange={handleChange}
              className="lwd-input h-12"
            />

            <textarea
              name="coverLetter"
              placeholder="Cover Letter"
              value={form.coverLetter}
              onChange={handleChange}
              className="lwd-input min-h-30"
            />

            <input
              name="resumeUrl"
              placeholder="Resume URL"
              value={form.resumeUrl}
              onChange={handleChange}
              className="lwd-input h-12"
            />
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleApply}
            disabled={loading}
            className={`lwd-btn-primary w-full h-14 flex items-center justify-center gap-2 ${
              loading ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-t-2 border-l-2 border-current rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : job.applicationSource === "EXTERNAL" ? (
              <>
                Apply on Website <ExternalLink size={18} />
              </>
            ) : (
              <>
                Submit Application <Send size={18} />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ApplyJob;
