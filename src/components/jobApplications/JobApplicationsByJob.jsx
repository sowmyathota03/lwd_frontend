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
    <div className="mt-8 bg-white shadow rounded-lg overflow-x-auto">
      <h2 className="text-xl font-semibold p-4 border-b">Applications List</h2>

      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Applicant</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Applied On</th>
            <th className="px-4 py-2">Update Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {applications.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No applications found
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.applicationId} className="hover:bg-gray-50">
                <td className="p-2 font-medium overflow-hidden whitespace-nowrap">
                  {app.jobSeekerId ? (
                    <span
                      onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      {app.applicantName}
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      {app.applicantName || "-"}
                    </span>
                  )}
                </td>

                <td className="p-2 font-medium overflow-hidden whitespace-nowrap">
                  {app.jobSeekerId ? (
                    <span
                      onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      {app.email}
                    </span>
                  ) : (
                    <span className="text-gray-500">{app.email || "-"}</span>
                  )}
                </td>

                <td className="px-4 py-2">{app.phone || "-"}</td>

                <td className="px-4 py-2">
                  <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {app.status}
                  </span>
                </td>

                <td className="px-4 py-2">
                  {app.appliedAt
                    ? new Date(app.appliedAt).toLocaleDateString("en-IN")
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  <ApplicationStatusDropdown
                    applicationId={app.applicationId}
                    currentStatus={app.status}
                    onStatusUpdated={(id, newStatus) => {
                      setApplications((prev) =>
                        prev.map((a) =>
                          a.applicationId === id
                            ? { ...a, status: newStatus }
                            : a,
                        ),
                      );
                    }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 p-4 border-t">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 0}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
