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
    if (jobId) {
      fetchApplications();
    }
  }, [jobId, page]);

  if (!jobId) return null;

  if (loading) return <Loader />;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">
          Applications ({applications.length})
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Applicant</th>
              <th className="px-6 py-3 text-left font-medium">Email</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Applied On</th>
              <th className="px-6 py-3 text-left font-medium">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.applicationId}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Applicant Name (clickable if jobSeekerId exists) */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    {app.jobSeekerId ? (
                      <button
                        onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {app.applicantName || "-"}
                      </button>
                    ) : (
                      <span className="text-gray-700">
                        {app.applicantName || "-"}
                      </span>
                    )}
                  </td>

                  {/* Email (clickable if jobSeekerId exists) */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    {app.jobSeekerId ? (
                      <button
                        onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                        className="text-blue-600 hover:underline"
                      >
                        {app.email || "-"}
                      </button>
                    ) : (
                      <span className="text-gray-700">{app.email || "-"}</span>
                    )}
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-gray-700">
                    {app.phone || "-"}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {app.status}
                    </span>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap text-gray-700">
                    {app.appliedAt
                      ? new Date(app.appliedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-6 py-3 whitespace-nowrap">
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{page + 1}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}