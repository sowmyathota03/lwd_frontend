// src/pages/jobs/ManageJobs.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import JobActions from "./JobActions";
import { getMyJobsByRole } from "../../api/JobApi";
import Loader from "../common/Loader";

// Heroicons v2 outline
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  UserIcon,
  BriefcaseIcon,
  TagIcon,
  CalendarIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

export default function ManageJobs() {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ================= DEBOUNCE SEARCH =================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      setPage(0);
    }, 1000);
    return () => clearTimeout(handler);
  }, [keyword]);

  // ================= REACT QUERY =================
  const { data, isLoading } = useQuery({
    queryKey: ["myJobs", page, debouncedKeyword],
    queryFn: () => getMyJobsByRole(page, debouncedKeyword),
    keepPreviousData: true,
  });

  const jobs = data?.content || [];
  const totalPages = data?.totalPages || 0;

  // ================= DELETE / STATUS CHANGE =================
  const handleDelete = () => queryClient.invalidateQueries(["myJobs"]);
  const handleStatusChange = () => queryClient.invalidateQueries(["myJobs"]);

  return (
    <div className="lwd-card">
      {/* ================= HEADER ================= */}
      <div className="lwd-section-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BriefcaseIcon className="h-5 w-5 text-blue-600" />
            Manage Jobs
          </h2>
          <p className="lwd-text text-sm mt-0.5">
            View, edit, and manage all your job postings
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search jobs by title, company..."
            className="lwd-input pl-10 pr-4 py-2"
          />
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">
        <table className="lwd-table text-sm min-w-300 lg:min-w-full">
          <thead className="lwd-table-header">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Industry</th>
              <th className="px-4 py-3 text-center">LWD Pref.</th>
              <th className="px-4 py-3 text-center">Notice Pref.</th>
              <th className="px-4 py-3 text-center">Experience</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Source</th>
              <th className="px-4 py-3 text-center hidden lg:table-cell">External URL</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Created</th>
              <th className="px-4 py-3 text-center hidden md:table-cell">Applications</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="15" className="text-center py-12">
                  <Loader fullScreen={false} className="lwd-loader" />
                  <p className="mt-2 lwd-text text-sm">Loading jobs...</p>
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="15" className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <DocumentTextIcon className="h-12 w-12 text-gray-300 dark:text-gray-500" />
                    <p className="mt-2 lwd-text text-sm">No jobs found</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Try adjusting your search or create a new job posting.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const rowClasses = `lwd-table-row transition-colors ${job.deleted
                    ? "bg-red-50/50 hover:bg-red-100/50"
                    : job.status === "CLOSED"
                      ? "bg-gray-50 hover:bg-gray-100/50"
                      : "hover:bg-gray-50 dark:hover:bg-slate-800"
                  }`;

                return (
                  <tr key={job.id} className={rowClasses}>
                    {/* Title */}
                    <td
                      className="px-4 py-3 font-medium text-blue-600 hover:underline cursor-pointer truncate max-w-xs lwd-text"
                      onClick={() =>
                        navigate(`/admin/managejob/${job.id}/analytics`)
                      }
                      title={job.title}
                    >
                      {job.title}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3 lwd-text">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-25">{job.location || "-"}</span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-3">
                      <div
                        className="flex items-center gap-1 cursor-pointer hover:underline hover:text-blue-600"
                        onClick={() =>
                          navigate(`/admin/${job.company?.id}/companyprofile`)
                        }
                      >
                        <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-30">{job.company?.companyName || "-"}</span>
                      </div>
                    </td>

                    {/* Created By */}
                    <td className="px-4 py-3 lwd-text">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-25">{job.createdBy?.name || "-"}</span>
                      </div>
                    </td>

                    {/* Job Type */}
                    <td className="px-4 py-3 text-center">
                      <span className="lwd-badge inline-flex items-center gap-1">
                        <BriefcaseIcon className="h-3 w-3" />
                        {job.jobType || "-"}
                      </span>
                    </td>

                    {/* Industry */}
                    <td className="px-4 py-3 text-center">
                      <span className="lwd-badge inline-flex items-center gap-1 bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                        <TagIcon className="h-3 w-3" />
                        {job.industry?.name || "-"}
                      </span>
                    </td>

                    {/* LWD Preferred */}
                    <td className="px-4 py-3 text-center">
                      {job.lwdPreferred ? (
                        <CheckCircleSolid className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>

                    {/* Notice Preference */}
                    <td className="px-4 py-3 text-center lwd-text">
                      {job.noticePreference || "-"}
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3 text-center lwd-text">
                      {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`lwd-badge inline-flex items-center gap-1 ${job.status === "OPEN"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                          }`}
                      >
                        {job.status === "OPEN" ? (
                          <CheckCircleIcon className="h-3 w-3" />
                        ) : (
                          <XCircleIcon className="h-3 w-3" />
                        )}
                        {job.status}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`lwd-badge inline-flex items-center gap-1 ${job.applicationSource === "EXTERNAL"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                          }`}
                      >
                        {job.applicationSource === "EXTERNAL" ? (
                          <GlobeAltIcon className="h-3 w-3" />
                        ) : (
                          <BriefcaseIcon className="h-3 w-3" />
                        )}
                        {job.applicationSource || "PORTAL"}
                      </span>
                    </td>

                    {/* External URL */}
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      {job.applicationSource === "EXTERNAL" && job.externalApplicationUrl ? (
                        <a
                          href={job.externalApplicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lwd-link inline-flex items-center gap-1 text-xs"
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          Link
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Created */}
                    <td className="px-4 py-3 text-center hidden md:table-cell lwd-text">
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        {job.createdAt
                          ? new Date(job.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                          : "-"}
                      </div>
                    </td>

                    {/* Applications */}
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="lwd-badge inline-flex justify-center">{job.totalApplications ?? 0}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                      <JobActions
                        job={job}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                        page={page}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="lwd-text text-sm">
            Page {page + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="lwd-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page + 1 >= totalPages}
              className="lwd-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}