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

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH JOB DETAILS =================
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load job details.");
      } finally {
        setLoadingJob(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    if (!fullName || !email || !phone) {
      alert("Full Name, Email, and Phone are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await applyForJob({
        jobId,
        fullName,
        email,
        phone,
        skills,
        coverLetter,
        resumeUrl,
      });
      alert(response.data);
      navigate(`/jobs/${jobId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to apply for job.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingJob) return <Loader />;
  if (!job)
    return (
      <p className="text-center mt-10 text-gray-600">
        Job not found.
      </p>
    );

  return (
    <div className="flex justify-center items-center px-4 py-16 min-h-[80vh] bg-gradient-to-br from-slate-100 to-blue-200">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back to Job Details
        </button>

        {/* Job Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {job.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {job.company?.companyName || job.company} • {job.location}
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center mb-8">
          Fill in your details and submit your application
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <textarea
            placeholder="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <input
            type="text"
            placeholder="Resume URL"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <button
            onClick={handleApply}
            disabled={loading}
            className="mt-2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
