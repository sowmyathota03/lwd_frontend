// src/pages/jobs/ManageJobs.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import JobActions from "./JobActions";
import { getMyJobsByRole } from "../../api/JobApi";
import Loader from "../common/Loader";

// Heroicons v2 outline – make sure @heroicons/react is installed
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

  console.log("Fetched jobs:", jobs);

  // ================= DELETE =================
  const handleDelete = async () => {
    queryClient.invalidateQueries(["myJobs"]);
  };

  // ================= STATUS CHANGE =================
  const handleStatusChange = () => {
    queryClient.invalidateQueries(["myJobs"]);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
              Manage Jobs
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm text-sm"
            />
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-300 lg:min-w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
              <th className="px-4 py-3 text-center hidden lg:table-cell">
                External URL
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Created
              </th>
              <th className="px-4 py-3 text-center hidden md:table-cell">
                Applications
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="15" className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <Loader fullScreen={false} />
                    <p className="mt-2 text-sm text-gray-500">
                      Loading jobs...
                    </p>
                  </div>
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="15" className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <DocumentTextIcon className="h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">
                      No jobs found
                    </p>
                    <p className="text-xs text-gray-400">
                      Try adjusting your search or create a new job posting.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                // Determine row background based on status
                const rowClasses = `transition-colors ${
                  job.deleted
                    ? "bg-red-50/50 hover:bg-red-100/50"
                    : job.status === "CLOSED"
                    ? "bg-gray-50 hover:bg-gray-100/50"
                    : "hover:bg-gray-50"
                }`;

                return (
                  <tr key={job.id} className={rowClasses}>
                    {/* Title */}
                    <td
                      className="px-4 py-3 font-medium text-blue-600 hover:underline cursor-pointer truncate max-w-xs"
                      onClick={() =>
                        navigate(`/admin/managejob/${job.id}/analytics`)
                      }
                      title={job.title}
                    >
                      {job.title}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="truncate max-w-25" title={job.location}>
                          {job.location || "-"}
                        </span>
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
                        <BuildingOfficeIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="truncate max-w-30" title={job.company?.companyName}>
                          {job.company?.companyName || "-"}
                        </span>
                      </div>
                    </td>

                    {/* Created By */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="truncate max-w-25" title={job.createdBy?.name || job.createdBy}>
                          {job.createdBy?.name || job.createdBy || "-"}
                        </span>
                      </div>
                    </td>

                    {/* Job Type */}
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        <BriefcaseIcon className="h-3 w-3" />
                        {job.jobType || "-"}
                      </span>
                    </td>

                    {/* Industry */}
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                        <TagIcon className="h-3 w-3" />
                        {job.industry?.name || job.industry || "-"}
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
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium">
                        {job.noticePreference || "-"}
                      </span>
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm">
                        {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "OPEN"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
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
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          job.applicationSource === "EXTERNAL"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
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
                      {job.applicationSource === "EXTERNAL" &&
                      job.externalApplicationUrl ? (
                        <a
                          href={job.externalApplicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                        >
                          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          Link
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Created Date */}
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
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

                    {/* Total Applications */}
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-800 font-medium px-2 py-1 rounded-full text-xs">
                        {job.totalApplications ?? 0}
                      </span>
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page + 1 >= totalPages}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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