import { useEffect, useState, useCallback } from "react";
import { getApplicationsByRole } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

export default function JobApplicationList() {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ================= FETCH APPLICATIONS =================
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getApplicationsByRole(page, size);

      console.log("Fetched applications:", data);
      setApplications(data?.applications || []);
      setTotalPages(data?.totalPages ?? 0);
    } catch (error) {
      console.error("Failed to fetch applications", error);
      setApplications([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page + 1 < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="md:p-4 p-0">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Job Applications
        </h2>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">

          {/* ================= TABLE HEADER ================= */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Applicant</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2 hidden lg:table-cell">External URL</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Applied On</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          {/* ================= TABLE BODY ================= */}
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-6">
                  <Loader fullScreen={false} />
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app.applicationId}
                  className="hover:bg-gray-50 transition"
                >

                  {/* ================= APPLICANT ================= */}
                  <td
                    className="text-blue-600 p-2 cursor-pointer hover:underline font-medium whitespace-nowrap"
                    onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                  >
                    {app.applicantName}
                  </td>

                  {/* ================= EMAIL ================= */}
                  <td
                    className="text-blue-600 p-2 cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                  >
                    {app.email}
                  </td>

                  {/* ================= JOB TITLE ================= */}
                  <td
                    className="px-4 py-2 truncate max-w-xs text-blue-600 cursor-pointer hover:underline"
                    onClick={() =>
                      app.job?.id &&
                      navigate(`/admin/managejob/${app.job.id}/analytics`)
                    }
                  >
                    {app.job?.title || "-"}
                  </td>

                  {/* ================= COMPANY ================= */}
                  <td className="px-4 py-2 truncate max-w-xs">
                    {app.company?.companyName || "-"}
                  </td>

                  {/* ================= APPLICATION SOURCE ================= */}
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase
                        ${
                          app.applicationSource === "EXTERNAL"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {app.applicationSource || "PORTAL"}
                    </span>
                  </td>

                  {/* ================= EXTERNAL URL ================= */}
                  <td className="px-4 py-2 hidden lg:table-cell truncate max-w-xs">
                    {app.applicationSource === "EXTERNAL" &&
                    app.externalApplicationUrl ? (
                      <a
                        href={app.externalApplicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* ================= STATUS ================= */}
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "SELECTED" || app.status === "HIRED"
                          ? "bg-green-100 text-green-700"
                          : app.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* ================= APPLIED DATE ================= */}
                  <td className="px-4 py-2">
                    {app.appliedAt
                      ? new Date(app.appliedAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  {/* ================= ACTION ================= */}
                  <td className="px-4 py-2">
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

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center px-6 py-4 border-t gap-4 border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className="px-4 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page + 1 >= totalPages}
            className="px-4 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
