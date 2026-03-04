import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobById, getSimilarJobs } from "../../api/JobApi";
import Loader from "../../components/common/Loader";
import JobCards from "../../components/jobs/JobCards";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  /* ================= JOB DETAILS QUERY ================= */

  const {
    data: job,
    isLoading: jobLoading,
    isError: jobError,
  } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: () => getJobById(jobId).then((res) => res.data),
    enabled: !!jobId,
  });

  /* ================= SIMILAR JOBS QUERY ================= */

  const {
    data: similarJobs = [],
    isLoading: similarLoading,
  } = useQuery({
    queryKey: ["similarJobs", jobId],
    queryFn: () => getSimilarJobs(jobId).then((res) => res.data),
    enabled: !!jobId,
  });

  const handleApplyClick = () => {
    navigate(`/apply/${job.id}`);
  };

  /* ================= STATES ================= */

  if (jobLoading) return <Loader />;
  if (jobError) return <p className="text-red-500 text-center mt-10">Failed to load job details.</p>;
  if (!job) return <p className="text-center mt-10">No job found.</p>;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-100 via-indigo-100 to-green-200 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= JOB DETAILS ================= */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">

          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-gray-600">
                {job.company?.companyName && (
                  <span>{job.company.companyName}</span>
                )}

                {job.company?.companyName && job.location && (
                  <span className="text-gray-400">•</span>
                )}

                {job.location && (
                  <span className="text-gray-500">{job.location}</span>
                )}
              </div>
            </div>

            <button
              onClick={handleApplyClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition font-medium"
            >
              🚀 Apply Now
            </button>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">

            {job.minExperience !== null && job.maxExperience !== null && (
              <div>
                <span className="text-sm text-gray-500">Experience • </span>
                <span className="px-3 py-1 text-sm border-2 border-red-700 bg-red-100 text-red-700 rounded-full">
                  {job.minExperience} - {job.maxExperience} Years
                </span>
              </div>
            )}

            {job.salary && (
              <div>
                <span className="text-sm text-gray-500">Salary • </span>
                <span className="px-3 py-1 text-sm border-2 border-gray-700 bg-gray-100 text-gray-700 rounded-full">
                  ₹{job.salary.toLocaleString()} LPA
                </span>
              </div>
            )}

            {job.jobType && (
              <div>
                <span className="text-sm text-gray-500">Job Type • </span>
                <span className="px-3 py-1 text-sm border-2 border-blue-700 bg-blue-100 text-blue-700 rounded-full">
                  {job.jobType}
                </span>
              </div>
            )}

            {job.industry && (
              <div>
                <span className="text-sm text-gray-500">Industry • </span>
                <span className="px-3 py-1 text-sm border-2 border-purple-700 bg-purple-100 text-purple-700 rounded-full">
                  {job.industry}
                </span>
              </div>
            )}

            {job.createdAt && (
              <div>
                <span className="text-sm text-gray-500">Posted On • </span>
                <span className="px-3 py-1 text-sm border-2 border-pink-700 bg-pink-100 text-pink-700 rounded-full">
                  {new Date(job.createdAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            )}

          </div>
        </div>

        {/* ================= JOB DESCRIPTION ================= */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* ================= SIMILAR JOBS ================= */}
        {similarJobs.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Similar Jobs
            </h2>

            {similarLoading && <Loader />}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarJobs.map((item) => (
                <JobCards key={item.id} job={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default JobDetails;
