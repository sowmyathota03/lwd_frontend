// src/pages/jobs/ManageJobs.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import JobActions from "./JobActions";
import { getMyJobsByRole } from "../../api/JobApi";
import Loader from "../common/Loader";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const navigate = useNavigate();

  // ================= FETCH JOBS =================
  const fetchJobs = useCallback(
    async (pageNumber = 0, searchKeyword = "") => {
      setLoading(true);
      try {
        const res = await getMyJobsByRole(pageNumber, searchKeyword);

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
    },
    []
  );

  // ================= DEBOUNCE KEYWORD =================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword); // update debounced keyword after delay
    }, 1000); // 1000ms delay

    return () => clearTimeout(handler); // cleanup on change
  }, [keyword]);

  // ================= FETCH JOBS WHEN KEYWORD OR PAGE CHANGES =================
  useEffect(() => {
    fetchJobs(0, debouncedKeyword); // reset to first page on search
  }, [debouncedKeyword, fetchJobs]);

  // ================= DELETE / STATUS HANDLERS =================
  const handleDelete = async (id, refresh = false) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));

    if (refresh) {
      await fetchJobs(page, debouncedKeyword);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      {/* ================= HEADER + SEARCH ================= */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-left text-xl font-semibold text-gray-800">
          Manage Jobs
        </h2>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search jobs..."
          className="border px-3 py-1 rounded-md text-sm"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          {/* ================= HEADER ================= */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600 uppercase tracking-wide">
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
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  <Loader fullScreen={false} />
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className={`transition
                    ${
                      job.deleted
                        ? "bg-red-400 text-gray-950 opacity-80"
                        : job.status === "CLOSED"
                        ? "bg-red-200"
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  <td
                    className="px-4 py-2 font-medium truncate max-w-xs cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/admin/managejob/${job.id}/analytics`)
                    }
                  >
                    {job.title}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{job.location || "-"}</td>
                  <td
                    className="px-4 py-2 truncate max-w-xs cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/admin/${job.company?.id}/companyprofile`)
                    }
                  >
                    {job.company?.companyName || "-"}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">{job.jobType || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase
                    ${
                      job.status === "OPEN"
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
                      ${
                        job.applicationSource === "EXTERNAL"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {job.applicationSource || "PORTAL"}
                    </span>
                  </td>
                  <td className="px-4 py-2 hidden lg:table-cell truncate max-w-xs">
                    {job.applicationSource === "EXTERNAL" && job.externalApplicationUrl ? (
                      <a
                        href={job.externalApplicationUrl}
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
                  <td className="px-4 py-2 hidden md:table-cell whitespace-nowrap">
                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-IN") : "-"}
                  </td>
                  <td className="px-4 py-2 text-center">{job.totalApplications ?? 0}</td>
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
        <div className="flex items-center justify-center px-6 py-4 border-t gap-3 border-gray-200">
          <button
            onClick={() => fetchJobs(page - 1, debouncedKeyword)}
            disabled={page === 0}
            className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => fetchJobs(page + 1, debouncedKeyword)}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
