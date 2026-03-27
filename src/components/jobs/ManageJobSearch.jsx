import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import JobActions from "./JobActions";
import { searchMyJobsByRole } from "../../api/JobApi";
import Loader from "../common/Loader";

import {
  MagnifyingGlassIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

const jobTypeOptions = [
  "FULL_TIME",
  "PART_TIME",
  "INTERNSHIP",
  "CONTRACT",
  "REMOTE",
];

const formatLabel = (value) =>
  value
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function ManageJobs() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [skills, setSkills] = useState("");
  const [jobType, setJobType] = useState("");

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
      setPage(0);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    setPage(0);
  }, [location, industry, skills, jobType]);

  const filters = useMemo(
    () => ({
      keyword: debouncedKeyword || null,
      location: location || null,
      industry: industry || null,
      skills: skills || null,
      jobType: jobType || null,
    }),
    [debouncedKeyword, location, industry, skills, jobType]
  );

  const hasActiveFilters = !!(
    keyword || location || industry || skills || jobType
  );

  const { data, isLoading } = useQuery({
    queryKey: ["myJobs", page, filters],
    queryFn: () => searchMyJobsByRole(filters, page),
    placeholderData: (prev) => prev,
  });

  const jobs = data?.content || [];
  const totalPages = data?.totalPages || 0;

  const handleDelete = () => {
    queryClient.invalidateQueries({ queryKey: ["myJobs"] });
  };

  const handleStatusChange = () => {
    queryClient.invalidateQueries({ queryKey: ["myJobs"] });
  };

  const clearFilters = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setLocation("");
    setIndustry("");
    setSkills("");
    setJobType("");
    setPage(0);
  };

  return (
    <div className="lwd-page">

      {/* HEADER */}
      <div className="lwd-card space-y-4">

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h2 className="lwd-title flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Manage Jobs
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View, edit, and manage your job postings
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search jobs..."
              className="lwd-input pl-10"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="lwd-card bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Filters
              </h3>
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="lwd-btn-danger text-sm">
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="lwd-input"
            />

            <input
              placeholder="Industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="lwd-input"
            />

            <input
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="lwd-input"
            />

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="lwd-input"
            >
              <option value="">All Job Types</option>
              {jobTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {formatLabel(item)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="lwd-card mt-4 overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-50 dark:bg-slate-700 text-xs uppercase text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  <Loader />
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500 dark:text-gray-400">
                  <DocumentTextIcon className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">

                  <td
                    className="px-4 py-3 text-blue-600 dark:text-blue-400 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/managejob/${job.id}/analytics`)
                    }
                  >
                    {job.title}
                  </td>

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {job.location}
                  </td>

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {job.company?.companyName}
                  </td>

                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {formatLabel(job.status)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <JobActions
                      job={job}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">

          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="lwd-btn-outline"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 >= totalPages}
            className="lwd-btn-outline"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}