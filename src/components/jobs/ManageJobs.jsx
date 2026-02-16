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
    <div className="min-h-screen bg-gray-100">
      
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Jobs
        </h1>

        <button
          onClick={() => navigate("/recruiters/jobs/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
        >
          + Create Job
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Job Type</th>
              <th className="px-6 py-4">Experience</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 hidden md:table-cell">Created</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Loading jobs...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition">
                  
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.title}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {job.location || "-"}
                  </td>

                   <td className="px-6 py-4 text-gray-600">
                    {job.company?.companyName || "-"}
                  </td>


                  <td className="px-6 py-4 text-gray-600">
                    {job.jobType || "-"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                      ${
                        job.status === "OPEN"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/recruiters/jobs/edit/${job.id}`, {
                            state: job,
                          })
                        }
                        className="px-3 py-1.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                      >
                        Edit
                      </button>

                      <JobActions
                        jobId={job.id}
                        currentStatus={job.status}
                        refresh={() => fetchJobs(page)}
                      />
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
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 0}
            onClick={() => fetchJobs(page - 1)}
            className="px-4 py-1.5 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => fetchJobs(page + 1)}
            className="px-4 py-1.5 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
