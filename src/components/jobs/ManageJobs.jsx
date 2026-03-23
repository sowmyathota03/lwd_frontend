// src/pages/jobs/ManageJobs.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import JobActions from "./JobActions";
import { getMyJobs } from "../../api/JobApi";
import Loader from "../common/Loader";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ================= FETCH JOBS =================
  const fetchJobs = useCallback(async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await getMyJobs(pageNumber);

      setJobs(res?.content || []);
      setPage(res?.pageNumber ?? 0);
      setTotalPages(res?.totalPages ?? 0);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      setJobs([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(0);
  }, [fetchJobs]);

  const handleDelete = async (id, refresh = false) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));

    if (refresh) {
      await fetchJobs(page);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  return (
    <div className="lwd-card">
      <h2 className="lwd-section-header">Manage Jobs</h2>

      <div className="overflow-x-auto">
        <table className="lwd-table text-sm text-left">
          {/* ================= HEADER ================= */}
          <thead className="lwd-table-header">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2 hidden lg:table-cell">External URL</th>
              <th className="px-4 py-2 hidden md:table-cell">Created</th>
              <th className="px-4 py-2 hidden md:table-cell">Total Applications</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center py-4 lwd-text">
                  <Loader fullScreen={false} className="lwd-loader" />
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 lwd-text">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className={`lwd-table-row transition
                    ${job.deleted
                      ? "bg-red-400 text-gray-950 opacity-80"
                      : job.status === "CLOSED"
                        ? "bg-red-200"
                        : "hover:lwd-card-hover"
                    }
                  `}
                >
                  <td
                    className="px-4 py-2 font-medium truncate max-w-xs cursor-pointer lwd-text hover:underline"
                    onClick={() =>
                      navigate(`/admin/managejob/${job.id}/analytics`)
                    }
                  >
                    {job.title}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap lwd-text">
                    {job.location || "-"}
                  </td>

                  <td
                    className="px-4 py-2 truncate max-w-xs cursor-pointer lwd-text hover:underline"
                    onClick={() =>
                      navigate(`/admin/${job.company?.id}/companyprofile`)
                    }
                  >
                    {job.company?.companyName || "-"}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap lwd-text">
                    {job.jobType || "-"}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap lwd-text">
                    {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase
                        ${job.status === "OPEN"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase
                        ${job.applicationSource === "EXTERNAL"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {job.applicationSource || "PORTAL"}
                    </span>
                  </td>

                  <td className="px-4 py-2 hidden lg:table-cell truncate max-w-xs lwd-text">
                    {job.applicationSource === "EXTERNAL" &&
                      job.externalApplicationUrl ? (
                      <a
                        href={job.externalApplicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lwd-link"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-2 hidden md:table-cell whitespace-nowrap lwd-text">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="px-4 py-2 text-center lwd-text">
                    {job.totalApplications ?? 0}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap">
                    <JobActions
                      job={job}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                      page={page}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center px-6 py-4 border-t gap-3 border-gray-200 dark:border-gray-700">
          <button
            onClick={() => fetchJobs(page - 1)}
            disabled={page === 0}
            className="lwd-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="lwd-text">
              Page {page + 1} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => fetchJobs(page + 1)}
            disabled={page + 1 >= totalPages}
            className="lwd-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}