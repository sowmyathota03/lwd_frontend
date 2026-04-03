import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";

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

const TABLE_COLUMNS = 11;

const formatLabel = (value) =>
  value
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  if (currentPage <= 1) {
    return [0, 1, 2, 3, 4];
  }

  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
    ];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
};

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

  // Debounce keyword search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword]);

  // Reset page when any filter changes
  useEffect(() => {
    setPage(0);
  }, [debouncedKeyword, location, industry, skills, jobType]);

  const filters = useMemo(
    () => ({
      keyword: debouncedKeyword || null,
      location: location.trim() || null,
      industry: industry.trim() || null,
      skills: skills.trim() || null,
      jobType: jobType || null,
    }),
    [debouncedKeyword, location, industry, skills, jobType]
  );

  const hasActiveFilters = !!(
    keyword.trim() ||
    location.trim() ||
    industry.trim() ||
    skills.trim() ||
    jobType
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["myJobs", page, filters],
    queryFn: () => searchMyJobsByRole(filters, page),
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  const jobs = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;
  const currentPage = data?.number ?? page;

  // If current page becomes invalid after delete/filter/update, move back safely
  useEffect(() => {
    if (totalPages > 0 && page > totalPages - 1) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

  const handleDelete = async () => {
    await queryClient.invalidateQueries({ queryKey: ["myJobs"] });
  };

  const handleStatusChange = async () => {
    await queryClient.invalidateQueries({ queryKey: ["myJobs"] });
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

  const goToPreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const goToNextPage = () => {
    setPage((prev) => {
      if (totalPages === 0) return 0;
      return Math.min(prev + 1, totalPages - 1);
    });
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

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
          <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Experience</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">External URL</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Created</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Applications</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={TABLE_COLUMNS} className="text-center py-10">
                  <Loader />
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={TABLE_COLUMNS}
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  <DocumentTextIcon className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  No jobs found
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job.id}
                  className={`transition ${job.deleted
                      ? "bg-red-100 dark:bg-red-900/30 opacity-80"
                      : job.status === "CLOSED"
                        ? "bg-red-50 dark:bg-red-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-slate-800"
                    }`}
                >
                  <td
                    className="px-4 py-3 font-medium cursor-pointer truncate max-w-xs lwd-text hover:underline"
                    onClick={() => navigate(`/admin/managejob/${job.id}/analytics`)}
                  >
                    {job.title}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap lwd-text">
                    {job.location || "-"}
                  </td>

                  <td
                    className="px-4 py-3 truncate max-w-xs cursor-pointer lwd-text hover:underline"
                    onClick={() => navigate(`/admin/${job.company?.id}/companyprofile`)}
                  >
                    {job.company?.companyName || "-"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap lwd-text">
                    {job.jobType ? formatLabel(job.jobType) : "-"}
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap lwd-text">
                    {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${job.status === "OPEN"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${job.applicationSource === "EXTERNAL"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                    >
                      {job.applicationSource || "PORTAL"}
                    </span>
                  </td>

                  <td className="px-4 py-3 hidden lg:table-cell truncate max-w-xs">
                    {job.applicationSource === "EXTERNAL" &&
                      job.externalApplicationUrl ? (
                      <a
                        href={job.externalApplicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell lwd-text whitespace-nowrap">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-center hidden md:table-cell lwd-text">
                    {job.totalApplications ?? 0}
                  </td>

                  <td className="px-4 py-3">
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

      {/* FOOTER INFO */}
      {!isLoading && totalElements > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing page <span className="font-semibold">{currentPage + 1}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
            {" • "}
            Total jobs: <span className="font-semibold">{totalElements}</span>
            {isFetching && (
              <span className="ml-2 text-blue-600 dark:text-blue-400">
                Updating...
              </span>
            )}
          </p>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage(0)}
            disabled={currentPage === 0}
            className="lwd-btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>

          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="lwd-btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${currentPage === pageNumber
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-gray-200 dark:border-slate-600 dark:hover:bg-slate-700"
                }`}
            >
              {pageNumber + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            className="lwd-btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>

          <button
            onClick={() => setPage(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
            className="lwd-btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}