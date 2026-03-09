import React, { useEffect, useState } from "react";
import { getMyApplications } from "../../../api/JobApplicationApi";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications(page);
  }, [page]);

  const fetchApplications = async (pageNumber) => {
    try {
      setLoading(true);

      const response = await getMyApplications(pageNumber, size);

      console.log("My Applications Response:", response);

      setApplications(response.data.applications);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateTime) => {
    if (!dateTime) return "N/A";
    return new Date(dateTime).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "SHORTLISTED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSourceColor = (source) => {
    return source === "EXTERNAL"
      ? "bg-purple-100 text-purple-700"
      : "bg-indigo-100 text-indigo-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          My Job Applications
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not applied to any jobs yet.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-linear-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">Job Title</th>
                    <th className="py-3 px-4 text-left">Company</th>
                    <th className="py-3 px-4 text-left">Applied At</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Source</th>
                    <th className="py-3 px-4 text-left">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.applicationId}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-medium">
                        {app.job?.title || "N/A"}
                      </td>

                      <td className="py-3 px-4">
                        {app.company?.companyName || "N/A"}
                      </td>

                      <td className="py-3 px-4">
                        {formatDate(app.appliedAt)}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* SOURCE */}
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getSourceColor(
                            app.applicationSource
                          )}`}
                        >
                          {app.applicationSource || "PORTAL"}
                        </span>
                      </td>

                      {/* URL */}
                      <td className="py-3 px-4">
                        {app.applicationSource === "EXTERNAL" && app.externalApplicationUrl ? (
                          <a
                            href={app.externalApplicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Job
                          </a>
                        ) : (
                          <span className="text-gray-400">Internal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-medium">
                Page {page + 1} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
