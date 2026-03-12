import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobById, getSimilarJobs } from "../../api/JobApi";
import Loader from "../../components/common/Loader";
import JobCards from "../../components/jobs/JobCards";

/**
 * JobDetails page – displays full details of a single job posting.
 * Also shows similar jobs based on the current job ID.
 */
function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Fetch main job details
  const {
    data: job,
    isLoading: jobLoading,
    isError: jobError,
  } = useQuery({
    queryKey: ["jobDetails", jobId],
    queryFn: () => getJobById(jobId).then((res) => res.data),
    enabled: !!jobId, // only run if jobId exists
  });

  // Fetch similar jobs
  const { data: similarJobs = [], isLoading: similarLoading } = useQuery({
    queryKey: ["similarJobs", jobId],
    queryFn: () => getSimilarJobs(jobId).then((res) => res.data),
    enabled: !!jobId,
  });

  // Navigate to application form
  const handleApplyClick = () => {
    if (job?.id) {
      navigate(`/apply/${job.id}`);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Loading state
  if (jobLoading) {
    return <Loader />;
  }

  // Error state
  if (jobError) {
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load job details. Please try again later.
      </p>
    );
  }

  // No job found
  if (!job) {
    return (
      <p className="text-center mt-10 text-gray-600">
        The requested job could not be found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ===== JOB HEADER CARD ===== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            {/* LEFT SIDE */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>

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

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <button
                onClick={handleApplyClick}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Now
              </button>

              {job.totalApplications != null && (
                <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                  {job.totalApplications} application
                  {job.totalApplications !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* ===== JOB META TAGS ===== */}
          <div className="flex flex-wrap gap-3">
            {job.minExperience != null && job.maxExperience != null && (
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

            {job.noticePreference && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                {job.noticePreference}
              </span>
            )}

            {job.maxNoticePeriod && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full">
                Max Notice: {job.maxNoticePeriod} days
              </span>
            )}
          </div>

          {/* ===== FOOTER INFO (BOTTOM RIGHT) ===== */}
          <div className="flex justify-end mt-6 gap-3 flex-wrap">
            {job.createdAt && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-full">
                Posted {formatDate(job.createdAt)}
              </span>
            )}

            {job.matchScore && (
              <span className="inline-flex items-center px-3 py-1.5 text-sm bg-green-100 text-green-800 rounded-full">
                Match Score: {job.matchScore}%
              </span>
            )}
          </div>
        </section>

        {/* ===== JOB DESCRIPTION ===== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Job Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {job.description}
          </p>
        </section>

        {/* ===== RESPONSIBILITIES ===== */}
        {job.responsibilities && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Responsibilities
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.responsibilities}
            </p>
          </section>
        )}

        {/* ===== REQUIREMENTS ===== */}
        {job.requirements && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.requirements}
            </p>
          </section>
        )}

        {/* ===== BENEFITS ===== */}
        {job.benefits && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Benefits
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.benefits}
            </p>
          </section>
        )}

        {/* ===== CANDIDATE PREFERENCES ===== */}
        {(job.education ||
          job.skills ||
          job.genderPreference ||
          job.ageLimit) && (
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Candidate Preferences
            </h2>
            <div className="space-y-2 text-gray-700">
              {job.education && (
                <p>
                  <strong>Education:</strong> {job.education}
                </p>
              )}
              {job.skills && (
                <p>
                  <strong>Skills:</strong> {job.skills}
                </p>
              )}
              {job.genderPreference && (
                <p>
                  <strong>Gender Preference:</strong> {job.genderPreference}
                </p>
              )}
              {job.ageLimit && (
                <p>
                  <strong>Age Limit:</strong> {job.ageLimit}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ===== SIMILAR JOBS ===== */}
        {similarJobs.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Similar Jobs
            </h2>
            {similarLoading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarJobs.map((item) => (
                  <JobCards key={item.id} job={item} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
