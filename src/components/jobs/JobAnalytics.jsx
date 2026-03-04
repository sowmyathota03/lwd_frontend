import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getJobAnalytics } from "../../api/JobApi";
import Loader from "../common/Loader";
import { Pencil } from "lucide-react";
import JobApplicationsByJob from "../jobApplications/JobApplicationsByJob";

export default function JobAnalytics() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobAnalytics", jobId],
    queryFn: () => getJobAnalytics(jobId).then((res) => res.data),
    enabled: !!jobId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to load analytics</p>;
  if (!data) return null;

  const { job, totalApplications, statusCounts } = data;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      {/* ================= JOB DETAILS CARD ================= */}
      <div className="bg-white shadow rounded-xl p-6 border space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-gray-600 mt-1">
              {job.company?.companyName} • {job.location}
            </p>
          </div>

          <div className="gap-2">
            {job.deleted && (
              <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full">
                Deleted
              </span>
            )}
            {!job.deleted && (
              <button
                onClick={() =>
                  navigate(`/jobs/updatejob/${job.id}`, { state: job })
                }
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          {job.salary && (
            <div>
              <span className="text-gray-500">Salary:</span>
              <p className="font-medium">₹{job.salary.toLocaleString()} LPA</p>
            </div>
          )}

          {job.jobType && (
            <div>
              <span className="text-gray-500">Job Type:</span>
              <p className="font-medium">{job.jobType}</p>
            </div>
          )}

          {job.minExperience !== null && job.maxExperience !== null && (
            <div>
              <span className="text-gray-500">Experience:</span>
              <p className="font-medium">
                {job.minExperience} - {job.maxExperience} Years
              </p>
            </div>
          )}

          {job.industry && (
            <div>
              <span className="text-gray-500">Industry:</span>
              <p className="font-medium">{job.industry}</p>
            </div>
          )}

          {job.createdAt && (
            <div>
              <span className="text-gray-500">Posted On:</span>
              <p className="font-medium">
                {new Date(job.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
      </div>

      {/* ================= ANALYTICS SECTION ================= */}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Applications */}
        <div className="bg-blue-100 text-blue-800 p-6 rounded-xl shadow">
          <p className="text-sm">Total Applications</p>
          <p className="text-2xl font-bold mt-2">{totalApplications}</p>
        </div>

        {/* Status Breakdown */}
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white shadow rounded-xl p-6 border">
            <p className="text-sm text-gray-500">{status}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{count}</p>
          </div>
        ))}
      </div>

      {/* Applications List */}
      <JobApplicationsByJob jobId={jobId} />

    </div>
  );
}
