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

  // ================= FETCH JOB DETAILS =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
        console.log("Fetched job details:", response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load job details.");
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [jobId]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= APPLY JOB =================
  const handleApply = async () => {
    if (!job) return;

    // Validation only for portal jobs
    if (job.applicationSource === "PORTAL") {
      if (!form.fullName || !form.email || !form.phone) {
        alert("Full Name, Email, and Phone are required.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        jobId,
        ...form,
      };

      const response = await applyForJob(payload);

      const result = response.data;

      // ================= EXTERNAL JOB =================
      if (job.applicationSource === "EXTERNAL") {

        alert("Redirecting to company website...");

        window.open(result, "_blank");

        navigate(`/jobs/${jobId}`);

        return;
      }

      // ================= PORTAL JOB =================
      alert(result || "Application submitted successfully");

      navigate(`/jobs/${jobId}`);

    } catch (err) {

      console.error(err);

      const message =
        err?.response?.data?.message ||
        "Please complete your profile before applying.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loadingJob) return <Loader />;

  if (!job) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Job not found.
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center px-4 py-16 min-h-[80vh] bg-linear-to-br from-slate-100 to-blue-200">

      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back to Job Details
        </button>

        {/* JOB INFO */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {job.title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {job.company?.companyName || "Company"} • {job.location}
          </p>
        </div>

        {/* EXTERNAL JOB NOTICE */}
        {job.applicationSource === "EXTERNAL" && (
          <p className="text-center text-sm text-orange-600 mb-6">
            Your profile details will be used automatically and you will be redirected to the company website.
          </p>
        )}

        {/* ================= PORTAL APPLICATION FORM ================= */}
       {(job?.applicationSource === "PORTAL" || !job?.applicationSource) && (
          <div className="flex flex-col gap-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={form.skills}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="coverLetter"
              placeholder="Cover Letter"
              value={form.coverLetter}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm min-h-25 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="resumeUrl"
              placeholder="Resume URL"
              value={form.resumeUrl}
              onChange={handleChange}
              className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
        )}

        {/* ================= APPLY BUTTON ================= */}
        <button
          onClick={handleApply}
          disabled={loading}
          className="mt-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition disabled:bg-blue-300 w-full"
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
