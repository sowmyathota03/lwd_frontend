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

  if (loadingJob) return <Loader />;

  if (!job) {
    return (
      <p className="text-center mt-10 lwd-text">
        Job not found.
      </p>
    );
  }

  return (
    <div className="lwd-page flex justify-center items-center px-4 py-16 min-h-[80vh]">

      <div className="w-full max-w-lg lwd-card p-8 rounded-2xl">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="lwd-link mb-4 text-sm"
        >
          ← Back to Job Details
        </button>

        {/* JOB INFO */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold lwd-title">
            {job.title}
          </h2>

          <p className="lwd-text mt-1">
            {job.company?.companyName || "Company"} • {job.location}
          </p>
        </div>

        {/* EXTERNAL NOTICE */}
        {job.applicationSource === "EXTERNAL" && (
          <p className="text-center text-sm text-orange-600 dark:text-orange-400 mb-6">
            You will be redirected to the company website.
          </p>
        )}

        {/* FORM */}
        {(job?.applicationSource === "PORTAL" || !job?.applicationSource) && (
          <div className="flex flex-col gap-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="lwd-input"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="lwd-input"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="lwd-input"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              className="lwd-input"
            />

            <textarea
              name="coverLetter"
              placeholder="Cover Letter"
              value={form.coverLetter}
              onChange={handleChange}
              className="lwd-input min-h-24 resize-y"
            />

            <input
              type="text"
              name="resumeUrl"
              placeholder="Resume URL"
              value={form.resumeUrl}
              onChange={handleChange}
              className="lwd-input"
            />

          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleApply}
          disabled={loading}
          className="mt-6 w-full lwd-btn-primary disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : job.applicationSource === "EXTERNAL"
              ? "Apply on Company Website"
              : "Submit Application"}
        </button>

      </div>
    </div>
  );
}

export default ApplyJob;