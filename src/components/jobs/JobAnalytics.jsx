import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobAnalytics } from "../../api/JobApi";
import Loader from "../common/Loader";
import { Pencil } from "lucide-react";
import JobApplicationsByJob from "../jobApplications/JobApplicationsByJob";

// ===== Meta Field =====
const MetaField = ({ label, value }) => {
  if (!value) return null;
  return (
    <div>
      <span className="lwd-text">{label}:</span>
      <p className="font-medium">{value}</p>
    </div>
  );
};

export default function JobAnalytics() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobAnalytics", jobId],
    queryFn: () => getJobAnalytics(jobId).then((res) => res.data),
    enabled: !!jobId,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load analytics
      </p>
    );

  if (!data) return null;

  const { job, totalApplications, statusCounts } = data;

  return (
    <div className="lwd-page p-6 space-y-8">

      {/* ================= JOB DETAILS ================= */}
      <div className="lwd-card p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="lwd-text mt-1">
              {job.company?.companyName} • {job.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {job.deleted && (
              <span className="lwd-badge bg-gray-600 text-white dark:bg-gray-700">
                Deleted
              </span>
            )}

            {!job.deleted && (
              <span
                className={`lwd-badge ${job.open
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
              >
                {job.open ? "Open" : "Closed"}
              </span>
            )}

            {!job.deleted && job.open && (
              <button
                onClick={() =>
                  navigate(`/jobs/updatejob/${job.id}`, { state: job })
                }
                className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-t pt-6 dark:border-gray-700">
          <MetaField
            label="Salary"
            value={
              job.minSalary && job.maxSalary
                ? `₹${job.minSalary}L - ₹${job.maxSalary}L`
                : null
            }
          />
          <MetaField label="Job Type" value={job.jobType} />
          <MetaField label="Workplace" value={job.workplaceType} />
          <MetaField label="Role" value={job.roleCategory} />
          <MetaField label="Department" value={job.department} />
          <MetaField
            label="Experience"
            value={
              job.minExperience != null && job.maxExperience != null
                ? `${job.minExperience} - ${job.maxExperience} Years`
                : null
            }
          />
          <MetaField label="Industry" value={job.industry} />
          <MetaField
            label="Notice Preference"
            value={job.noticePreference?.replaceAll("_", " ")}
          />
          <MetaField
            label="Max Notice Period"
            value={job.maxNoticePeriod > 0 ? `${job.maxNoticePeriod} Days` : null}
          />
          <MetaField
            label="LWD Preferred"
            value={job.lwdPreferred ? "Yes" : null}
          />
          <MetaField label="Application Source" value={job.applicationSource} />
          <MetaField
            label="External Apply URL"
            value={
              job.externalApplicationUrl ? (
                <a
                  href={job.externalApplicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lwd-link break-all"
                >
                  {job.externalApplicationUrl}
                </a>
              ) : null
            }
          />
          <MetaField
            label="Posted On"
            value={
              job.createdAt
                ? new Date(job.createdAt).toLocaleDateString("en-IN")
                : null
            }
          />
        </div>

        {/* Sections */}
        {["description", "responsibilities", "requirements", "benefits"].map(
          (field) =>
            job[field] && (
              <div key={field} className="border-t pt-6 dark:border-gray-700">
                <h2 className="lwd-title mb-3 capitalize">{field}</h2>
                <p className="lwd-text whitespace-pre-line leading-relaxed">
                  {job[field]}
                </p>
              </div>
            )
        )}
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Total */}
        <div className="lwd-card p-6">
          <p className="text-sm uppercase tracking-wide text-blue-500">
            Total Applications
          </p>
          <p className="text-3xl font-bold mt-2">{totalApplications}</p>
        </div>

        {/* Status Cards */}
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="lwd-card p-6">
            <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {status}
            </p>
            <p className="text-3xl font-bold mt-2">{count}</p>
          </div>
        ))}
      </div>

      {/* ================= APPLICATIONS ================= */}
      <JobApplicationsByJob jobId={jobId} />
    </div>
  );
}