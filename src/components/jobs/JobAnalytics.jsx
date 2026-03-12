import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobAnalytics } from "../../api/JobApi";
import Loader from "../common/Loader";
import { Pencil } from "lucide-react";
import JobApplicationsByJob from "../jobApplications/JobApplicationsByJob";

// Helper component for displaying a single meta field
const MetaField = ({ label, value }) => {
  if (!value) return null;
  return (
    <div>
      <span className="text-sm text-gray-500">{label}:</span>
      <p className="font-medium text-gray-800">{value}</p>
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
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* Job Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-600 mt-1">
              {job.company?.companyName} • {job.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {job.deleted && (
              <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                Deleted
              </span>
            )}
            {!job.deleted && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  job.open
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
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
                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Meta Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm border-t border-gray-200 pt-6">
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
                  className="text-blue-600 hover:underline break-all"
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

        {/* Description Sections */}
        {job.description && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>
        )}

        {job.responsibilities && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Responsibilities
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.responsibilities}
            </p>
          </div>
        )}

        {job.requirements && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Requirements
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.requirements}
            </p>
          </div>
        )}

        {job.benefits && (
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Benefits
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {job.benefits}
            </p>
          </div>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Applications */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            Total Applications
          </p>
          <p className="text-3xl font-bold text-blue-900 mt-2">
            {totalApplications}
          </p>
        </div>

        {/* Status Breakdown */}
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {status}
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{count}</p>
          </div>
        ))}
      </div>

      {/* Applications List */}
      <JobApplicationsByJob jobId={jobId} />
    </div>
  );
}