import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplicationsByJobId } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

export default function JobApplicationsByJob({ jobId }) {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await getApplicationsByJobId(jobId, page, size);
      const data = res.data;
      setApplications(data.applications || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchApplications();
  }, [jobId, page]);

  if (!jobId) return null;
  if (loading) return <Loader />;

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";

    switch (status) {
      case "SELECTED":
        return `${base} bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700`;
      case "REJECTED":
        return `${base} bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700`;
      default:
        return `${base} bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700`;
    }
  };

  return (
    <div className="lwd-card overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800">
        <h2 className="text-lg font-semibold lwd-title">
          Applications ({applications.length})
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm lwd-text">

          <thead className="bg-gray-100 dark:bg-slate-800 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Applicant</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Applied On</th>
              <th className="px-6 py-3 text-left">Update</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {applications.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center lwd-text">
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.applicationId}
                  className="hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  {/* Applicant */}
                  <td className="px-6 py-3">
                    {app.jobSeekerId ? (
                      <button
                        onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                        className="lwd-link font-medium"
                      >
                        {app.applicantName || "-"}
                      </button>
                    ) : (
                      <span>{app.applicantName || "-"}</span>
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-3">
                    {app.jobSeekerId ? (
                      <button
                        onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                        className="lwd-link"
                      >
                        {app.email || "-"}
                      </button>
                    ) : (
                      <span>{app.email || "-"}</span>
                    )}
                  </td>

                  {/* Phone */}
                  <td className="px-6 py-3">{app.phone || "-"}</td>

                  {/* Status */}
                  <td className="px-6 py-3">
                    <span className={getStatusBadge(app.status)}>
                      {app.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-3">
                    {app.appliedAt
                      ? new Date(app.appliedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "-"}
                  </td>

                  {/* Dropdown */}
                  <td className="px-6 py-3">
                    <ApplicationStatusDropdown
                      applicationId={app.applicationId}
                      currentStatus={app.status}
                      onStatusUpdated={(id, newStatus) => {
                        setApplications((prev) =>
                          prev.map((a) =>
                            a.applicationId === id
                              ? { ...a, status: newStatus }
                              : a
                          )
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="lwd-btn-secondary"
          >
            Previous
          </button>

          <span className="lwd-text">
            Page {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 >= totalPages}
            className="lwd-btn-secondary"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}