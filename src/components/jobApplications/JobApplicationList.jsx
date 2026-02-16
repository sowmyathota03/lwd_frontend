import { useEffect, useState, useCallback } from "react";
import {
  getApplicationsByRole,
  changeApplicationStatus,
} from "../../api/JobApplicationApi";

export default function JobApplicationList() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const statusOptions = [
    "APPLIED",
    "SHORTLISTED",
    "INTERVIEW_SCHEDULED",
    "SELECTED",
    "REJECTED",
    "ON_HOLD",
    "HIRED",
  ];

  // ================= FETCH =================
  const fetchApplications = useCallback(async (pageNumber = 0) => {
    try {
      setLoading(true);
      const data = await getApplicationsByRole(pageNumber, size);

      setApplications(data?.applications || []);
      setPage(data?.pageNumber ?? 0);
      setTotalPages(data?.totalPages ?? 0);
    } catch (error) {
      console.error("Failed to fetch applications", error);
      setApplications([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [size]);

  useEffect(() => {
    fetchApplications(0);
  }, [fetchApplications]);

  // ================= STATUS UPDATE =================
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      await changeApplicationStatus(applicationId, status);

      setApplications((prev) =>
        prev.map((app) =>
          app.applicationId === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-4">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Job Applications
        </h2>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applied On</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  Loading applications...
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.applicationId}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {app.applicantName}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {app.email}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {app.job?.title || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {app.company?.companyName || "-"}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "SELECTED" ||
                        app.status === "HIRED"
                          ? "bg-green-100 text-green-700"
                          : app.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : app.status === "INTERVIEW_SCHEDULED"
                          ? "bg-yellow-100 text-yellow-700"
                          : app.status === "SHORTLISTED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {app.appliedAt
                      ? new Date(app.appliedAt).toLocaleDateString(
                          "en-IN"
                        )
                      : "-"}
                  </td>

                  {/* ACTION */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <select
                        className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={app.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            app.applicationId,
                            e.target.value
                          )
                        }
                        disabled={updatingId === app.applicationId}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {updatingId === app.applicationId && (
                        <span className="text-xs text-blue-500 animate-pulse">
                          Updating...
                        </span>
                      )}

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center mt-6">
          <button
            disabled={page === 0}
            onClick={() => fetchApplications(page - 1)}
            className="px-4 py-2 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => fetchApplications(page + 1)}
            className="px-4 py-2 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
