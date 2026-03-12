import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobById, getSimilarJobs } from "../../api/JobApi";
import Loader from "../../components/common/Loader";
import JobCards from "../../components/jobs/JobCards";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const {
    data: job,
    isLoading: jobLoading,
    isError: jobError,
  } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: () => getJobById(jobId).then((res) => res.data),
    enabled: !!jobId,
  });
  console.log("Job Details:", job);

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

  if (jobLoading) return <Loader />;

  if (jobError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load job details.
      </p>
    );

  if (!job) return <p className="text-center mt-10">No job found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Job Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                {job.company?.companyName && <span>{job.company.companyName}</span>}
                {job.company?.companyName && job.location && (
                  <span className="text-gray-400">•</span>
                )}
                {job.location && <span className="text-gray-500">{job.location}</span>}
              </div>
            </div>
            <div className="flex flex-col">
              <button
                onClick={handleApplyClick}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
              >
                Apply Now
              </button>
              {job.totalApplications != null && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.totalApplications} applications
              </span>
            )}
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Job Meta Tags */}
          <div className="flex flex-wrap gap-3">
            {job.minExperience !== null && job.maxExperience !== null && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.minExperience} - {job.maxExperience} years
              </span>
            )}
            {job.minSalary && job.maxSalary && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                ₹{job.minSalary}L - ₹{job.maxSalary}L
              </span>
            )}
            {job.jobType && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.jobType}
              </span>
            )}
            {job.workplaceType && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.workplaceType}
              </span>
            )}
            {job.roleCategory && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.roleCategory}
              </span>
            )}
            {job.department && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.department}
              </span>
            )}
            {job.industry && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.industry}
              </span>
            )}
            {job.createdAt && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                Posted {new Date(job.createdAt).toLocaleDateString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Responsibilities */}
        {job.responsibilities && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Responsibilities
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.responsibilities}
            </p>
          </div>
        )}

        {/* Requirements */}
        {job.requirements && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.requirements}
            </p>
          </div>
        )}

        {/* Benefits */}
        {job.benefits && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Benefits
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.benefits}
            </p>
          </div>
        )}

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Similar Jobs
            </h2>
            {similarLoading && <Loader />}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
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