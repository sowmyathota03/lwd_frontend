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
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300";
      case "REJECTED":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300";
      case "SHORTLISTED":
        return "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const getSourceColor = (source) => {
    return source === "EXTERNAL"
      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
      : "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-6 transition-colors">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6 transition-colors">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          My Job Applications
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You have not applied to any jobs yet.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium">Job Title</th>
                    <th className="py-3 px-4 text-left font-medium">Company</th>
                    <th className="py-3 px-4 text-left font-medium">Applied At</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Source</th>
                    <th className="py-3 px-4 text-left font-medium">Link</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {applications.map((app) => (
                    <tr
                      key={app.applicationId}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                        {app.job?.title || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {app.company?.companyName || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
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
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getSourceColor(
                            app.applicationSource
                          )}`}
                        >
                          {app.applicationSource || "PORTAL"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {app.applicationSource === "EXTERNAL" && app.externalApplicationUrl ? (
                          <a
                            href={app.externalApplicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View Job
                          </a>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500">Internal</span>
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
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>

              <span className="font-medium text-gray-700 dark:text-gray-300">
                Page {page + 1} of {totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 === totalPages}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-50 transition-colors"
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