// src/pages/jobs/ManageJobs.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import JobActions from "./JobActions";
import { getMyJobs } from "../../api/JobApi";

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

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <h2 className="text-left text-xl font-semibold text-gray-800 px-6 py-4 border-b border-gray-200">
        Manage Jobs
      </h2>
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
              <th className="px-4 py-2 hidden md:table-cell">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Loading jobs...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className={`transition
                ${job.status === "CLOSED" ? "bg-red-50" : "hover:bg-gray-50"}
              `}
                >
                  <td className="px-4 py-2 font-medium text-gray-800 truncate max-w-xs">
                    {job.title}
                  </td>

                  <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                    {job.location || "-"}
                  </td>

                  <td className="px-4 py-2 text-gray-600 truncate max-w-xs">
                    {job.company?.companyName || "-"}
                  </td>

                  <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                    {job.jobType || "-"}
                  </td>

                  <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                    {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                  </td>

                  {/* Status */}
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase
                    ${
                      job.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-2 text-gray-500 hidden md:table-cell whitespace-nowrap">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap">
                    <JobActions job={job} refresh={() => fetchJobs(page)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
