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
    <div className="lwd-page p-6">
      <div className="lwd-container">

        {/* ===== HEADER ===== */}
        <div className="lwd-card mb-6">
          <h2 className="lwd-page-title">Manage Jobs</h2>
          <p className="lwd-text mt-1">
            View, edit, and manage all your posted jobs.
          </p>
        </div>

        {/* ===== TABLE CARD ===== */}
        <div className="lwd-card overflow-hidden">

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">

              {/* ===== HEADER ===== */}
              <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Experience</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3 hidden lg:table-cell">External URL</th>
                  <th className="px-4 py-3 hidden md:table-cell">Created</th>
                  <th className="px-4 py-3 hidden md:table-cell">Applications</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              {/* ===== BODY ===== */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-6">
                      <Loader fullScreen={false} className="lwd-loader" />
                    </td>
                  </tr>
                ) : jobs.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-6 lwd-text">
                      No jobs found
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.id}
                      className={`transition ${job.deleted
                          ? "bg-red-100 dark:bg-red-900/30 opacity-80"
                          : job.status === "CLOSED"
                            ? "bg-red-50 dark:bg-red-900/20"
                            : "hover:bg-gray-50 dark:hover:bg-slate-800"
                        }`}
                    >
                      {/* Title */}
                      <td
                        className="px-4 py-3 font-medium cursor-pointer truncate max-w-xs lwd-text hover:underline"
                        onClick={() =>
                          navigate(`/admin/managejob/${job.id}/analytics`)
                        }
                      >
                        {job.title}
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3 whitespace-nowrap lwd-text">
                        {job.location || "-"}
                      </td>

                      {/* Company */}
                      <td
                        className="px-4 py-3 truncate max-w-xs cursor-pointer lwd-text hover:underline"
                        onClick={() =>
                          navigate(`/admin/${job.company?.id}/companyprofile`)
                        }
                      >
                        {job.company?.companyName || "-"}
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3 whitespace-nowrap lwd-text">
                        {job.jobType || "-"}
                      </td>

                      {/* Experience */}
                      <td className="px-4 py-3 whitespace-nowrap lwd-text">
                        {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-md font-semibold ${job.status === "OPEN"
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            }`}
                        >
                          {job.status}
                        </span>
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-md font-semibold ${job.applicationSource === "EXTERNAL"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                            }`}
                        >
                          {job.applicationSource || "PORTAL"}
                        </span>
                      </td>

                      {/* External URL */}
                      <td className="px-4 py-3 hidden lg:table-cell truncate max-w-xs">
                        {job.applicationSource === "EXTERNAL" &&
                          job.externalApplicationUrl ? (
                          <a
                            href={job.externalApplicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Created */}
                      <td className="px-4 py-3 hidden md:table-cell lwd-text">
                        {job.createdAt
                          ? new Date(job.createdAt).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      {/* Applications */}
                      <td className="px-4 py-3 text-center lwd-text">
                        {job.totalApplications ?? 0}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
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

          {/* ===== PAGINATION ===== */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => fetchJobs(page - 1)}
                disabled={page === 0}
                className="lwd-btn-secondary disabled:opacity-50"
              >
                Previous
              </button>

              <span className="lwd-text">
                Page {page + 1} of {totalPages}
              </span>

              <button
                onClick={() => fetchJobs(page + 1)}
                disabled={page + 1 >= totalPages}
                className="lwd-btn-secondary disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}