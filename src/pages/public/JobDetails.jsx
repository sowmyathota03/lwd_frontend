import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobById, getSimilarJobs } from "../../api/JobApi";
import Loader from "../../components/common/Loader";
import JobCards from "../../components/jobs/JobCards";

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
    enabled: !!jobId,
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

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center pt-20">
        <Loader />
      </div>
    );
  }

  if (jobError) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 flex justify-center items-start">
        <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-6 rounded-2xl text-center border border-red-100 dark:border-red-800/50 max-w-lg w-full font-medium shadow-sm">
           Failed to load job details. Please try again later.
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 flex justify-center items-start border-none">
        <div className="text-center mt-10 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-10 rounded-3xl max-w-lg w-full shadow-sm border border-slate-100 dark:border-slate-700/60">
           The requested job could not be found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ===== JOB HEADER CARD ===== */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-10 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            
            {/* LEFT SIDE */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mt-2 text-slate-600 dark:text-slate-400 font-medium">
                {job.company?.companyName && (
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    {job.company.companyName}
                  </span>
                )}

                {job.company?.companyName && job.location && (
                  <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                )}

                {job.location && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {job.location}
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-start md:items-end gap-3 min-w-max">
              <button
                onClick={handleApplyClick}
                className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-bold transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>

              {job.totalApplications != null && (
                <span className="inline-flex items-center justify-center w-full md:w-auto px-4 py-2 text-sm font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-800/50">
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  {job.totalApplications} application{job.totalApplications !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          <hr className="my-8 border-slate-100 dark:border-slate-700/60" />

          {/* ===== JOB META TAGS ===== */}
          <div className="flex flex-wrap gap-3">
            {job.minExperience != null && job.maxExperience != null && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300 rounded-xl">
                💼 {job.minExperience} - {job.maxExperience} years
              </span>
            )}

            {job.minSalary && job.maxSalary && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl">
                💰 ₹{job.minSalary}L - ₹{job.maxSalary}L
              </span>
            )}

            {job.jobType && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl">
                ⏱ {job.jobType}
              </span>
            )}

            {job.workplaceType && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl">
                🏢 {job.workplaceType}
              </span>
            )}

            {job.roleCategory && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-xl">
                ✨ {job.roleCategory}
              </span>
            )}

            {job.department && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-xl">
                📊 {job.department}
              </span>
            )}

            {job.industry && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 rounded-xl">
                🏭 {job.industry}
              </span>
            )}

            {job.noticePreference && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-bold bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 rounded-xl border border-cyan-100 dark:border-cyan-800/50">
                🚨 {job.noticePreference}
              </span>
            )}

            {job.maxNoticePeriod && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300 rounded-xl">
                ⏱ Max Notice: {job.maxNoticePeriod} days
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/60 flex-wrap gap-4">
            {job.matchScore && (
              <span className="inline-flex items-center px-4 py-2 text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl shadow-sm">
                🔥 Match Score: {job.matchScore}%
              </span>
            )}

            {job.createdAt && (
              <span className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 ml-auto">
                Posted {formatDate(job.createdAt)}
              </span>
            )}
          </div>
        </section>

        {/* ===== JOB DESCRIPTION ===== */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Job Description
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-base md:text-lg">
              {job.description}
            </p>
          </div>
        </section>

        {/* ===== RESPONSIBILITIES ===== */}
        {job.responsibilities && (
          <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Responsibilities
            </h2>
            <div className="p-6 bg-blue-50/50 dark:bg-slate-900/50 rounded-2xl border border-blue-100/50 dark:border-slate-700/50">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-base md:text-lg">
                {job.responsibilities}
              </p>
            </div>
          </section>
        )}

        {/* ===== REQUIREMENTS ===== */}
        {job.requirements && (
          <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Requirements
            </h2>
            <div className="p-6 bg-emerald-50/50 dark:bg-slate-900/50 rounded-2xl border border-emerald-100/50 dark:border-slate-700/50">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-base md:text-lg">
                {job.requirements}
              </p>
            </div>
          </section>
        )}

        {/* ===== BENEFITS ===== */}
        {job.benefits && (
          <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Benefits
            </h2>
            <div className="p-6 bg-purple-50/50 dark:bg-slate-900/50 rounded-2xl border border-purple-100/50 dark:border-slate-700/50">
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-base md:text-lg">
                {job.benefits}
              </p>
            </div>
          </section>
        )}

        {/* ===== CANDIDATE PREFERENCES ===== */}
        {(job.education ||
          job.skills ||
          job.genderPreference ||
          job.ageLimit) && (
          <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Candidate Preferences
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {job.education && (
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50">
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Education</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.education}</span>
                </div>
              )}
              {job.skills && (
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50">
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Skills</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.skills}</span>
                </div>
              )}
              {job.genderPreference && (
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50">
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Gender Preference</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.genderPreference}</span>
                </div>
              )}
              {job.ageLimit && (
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50">
                  <span className="block text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Age Limit</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{job.ageLimit}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===== SIMILAR JOBS ===== */}
        {similarJobs.length > 0 && (
          <section className="pt-8 pb-4">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Similar Jobs
              </h2>
              <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
            </div>
            {similarLoading ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarJobs.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                    <JobCards job={item} />
                  </div>
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
