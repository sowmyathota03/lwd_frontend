import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import JobActions from "./JobActions";
import { searchMyJobsByRole } from "../../api/JobApi";
import Loader from "../common/Loader";

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
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid";

const jobTypeOptions = [
  "FULL_TIME",
  "PART_TIME",
  "INTERNSHIP",
  "CONTRACT",
  "REMOTE",
];

const statusOptions = ["OPEN", "CLOSED", "DRAFT"];

const sourceOptions = ["PORTAL", "EXTERNAL"];

const noticeOptions = [
  "IMMEDIATE_JOINER",
  "OPEN_TO_WORK",
  "SERVING_NOTICE",
  "NOT_SERVING",
  "NOT_LOOKING",
  "ANY",
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
  const [status, setStatus] = useState("");
  const [applicationSource, setApplicationSource] = useState("");
  const [noticePreference, setNoticePreference] = useState("");
  const [lwdPreferred, setLwdPreferred] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [maxExperience, setMaxExperience] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
      setPage(0);
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    setPage(0);
  }, [
    location,
    industry,
    skills,
    jobType,
    status,
    applicationSource,
    noticePreference,
    lwdPreferred,
    minExperience,
    maxExperience,
    minSalary,
    maxSalary,
  ]);

  const filters = useMemo(
    () => ({
      keyword: debouncedKeyword || null,
      location: location.trim() || null,
      industry: industry.trim() || null,
      skills: skills.trim() || null,
      jobType: jobType || null,
      status: status || null,
      applicationSource: applicationSource || null,
      noticePreference: noticePreference || null,
      lwdPreferred:
        lwdPreferred === ""
          ? null
          : lwdPreferred === "true"
          ? true
          : false,
      minExperience: minExperience === "" ? null : Number(minExperience),
      maxExperience: maxExperience === "" ? null : Number(maxExperience),
      minSalary: minSalary === "" ? null : Number(minSalary),
      maxSalary: maxSalary === "" ? null : Number(maxSalary),
    }),
    [
      debouncedKeyword,
      location,
      industry,
      skills,
      jobType,
      status,
      applicationSource,
      noticePreference,
      lwdPreferred,
      minExperience,
      maxExperience,
      minSalary,
      maxSalary,
    ]
  );

  const hasActiveFilters = !!(
    keyword.trim() ||
    location.trim() ||
    industry.trim() ||
    skills.trim() ||
    jobType ||
    status ||
    applicationSource ||
    noticePreference ||
    lwdPreferred !== "" ||
    minExperience !== "" ||
    maxExperience !== "" ||
    minSalary !== "" ||
    maxSalary !== ""
  );

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["myJobs", page, filters],
    queryFn: () => searchMyJobsByRole(filters, page),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  });

  const jobs = data?.content || data?.jobs || [];
  const totalPages = data?.totalPages || 0;

  const handleDelete = async () => {
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
    setStatus("");
    setApplicationSource("");
    setNoticePreference("");
    setLwdPreferred("");
    setMinExperience("");
    setMaxExperience("");
    setMinSalary("");
    setMaxSalary("");
    setPage(0);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
              Manage Jobs
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              View, edit, and manage all your job postings
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by title, location, skills..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm text-sm"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-800">Filters</h3>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Industry"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Skills"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All Job Types</option>
              {jobTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {formatLabel(item)}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All Status</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {formatLabel(item)}
                </option>
              ))}
            </select>

            <select
              value={applicationSource}
              onChange={(e) => setApplicationSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All Sources</option>
              {sourceOptions.map((item) => (
                <option key={item} value={item}>
                  {formatLabel(item)}
                </option>
              ))}
            </select>

            <select
              value={noticePreference}
              onChange={(e) => setNoticePreference(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All Notice Preferences</option>
              {noticeOptions.map((item) => (
                <option key={item} value={item}>
                  {formatLabel(item)}
                </option>
              ))}
            </select>

            <select
              value={lwdPreferred}
              onChange={(e) => setLwdPreferred(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">All LWD Preferences</option>
              <option value="true">LWD Preferred</option>
              <option value="false">LWD Not Preferred</option>
            </select>

            <input
              type="number"
              min="0"
              value={minExperience}
              onChange={(e) => setMinExperience(e.target.value)}
              placeholder="Min Experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <input
              type="number"
              min="0"
              value={maxExperience}
              onChange={(e) => setMaxExperience(e.target.value)}
              placeholder="Max Experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <input
              type="number"
              min="0"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              placeholder="Min Salary"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <input
              type="number"
              min="0"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              placeholder="Max Salary"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse min-w-300 lg:min-w-full">
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

          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="15" className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <Loader fullScreen={false} />
                    <p className="mt-2 text-sm text-gray-500">Loading jobs...</p>
                  </div>
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan="15" className="text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <DocumentTextIcon className="h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No jobs found</p>
                    <p className="text-xs text-gray-400">
                      Try adjusting your search or filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const rowClasses = `transition-colors ${
                  job.deleted
                    ? "bg-red-50/50 hover:bg-red-100/50"
                    : job.status === "CLOSED"
                    ? "bg-gray-50 hover:bg-gray-100/50"
                    : "hover:bg-gray-50"
                }`;

                return (
                  <tr key={job.id} className={rowClasses}>
                    <td
                      className="px-4 py-3 font-medium text-blue-600 hover:underline cursor-pointer truncate max-w-xs"
                      onClick={() =>
                        navigate(`/admin/managejob/${job.id}/analytics`)
                      }
                      title={job.title}
                    >
                      {job.title}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span className="truncate max-w-25" title={job.location}>
                          {job.location || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div
                        className="flex items-center gap-1 cursor-pointer hover:underline hover:text-blue-600"
                        onClick={() =>
                          navigate(`/admin/${job.company?.id}/companyprofile`)
                        }
                      >
                        <BuildingOfficeIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span
                          className="truncate max-w-30"
                          title={job.company?.companyName}
                        >
                          {job.company?.companyName || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4 text-gray-400 shrink-0" />
                        <span
                          className="truncate max-w-25"
                          title={job.createdBy?.name || job.createdBy}
                        >
                          {job.createdBy?.name || job.createdBy || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        <BriefcaseIcon className="h-3 w-3" />
                        {formatLabel(job.jobType) || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                        <TagIcon className="h-3 w-3" />
                        {job.industry?.name || job.industry || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {job.lwdPreferred ? (
                        <CheckCircleSolid className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-gray-300 mx-auto" />
                      )}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-medium">
                        {formatLabel(job.noticePreference) || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="text-sm">
                        {job.minExperience ?? 0} - {job.maxExperience ?? 0} yrs
                      </span>
                    </td>

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
                        {formatLabel(job.status)}
                      </span>
                    </td>

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
                        {formatLabel(job.applicationSource || "PORTAL")}
                      </span>
                    </td>

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

                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="inline-flex items-center justify-center bg-gray-100 text-gray-800 font-medium px-2 py-1 rounded-full text-xs">
                        {job.totalApplications ?? 0}
                      </span>
                    </td>

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

      {isFetching && !isLoading && (
        <div className="px-6 py-2 text-sm text-gray-500 border-t border-gray-100">
          Updating jobs...
        </div>
      )}

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