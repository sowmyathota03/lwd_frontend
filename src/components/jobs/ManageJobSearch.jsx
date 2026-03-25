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

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
      setPage(0);
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword]);

  // Reset page on filter change
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
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const jobs = data?.content || data?.jobs || [];
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
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white space-y-4">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
              Manage Jobs
            </h2>
            <p className="text-sm text-gray-500">
              View, edit, and manage all your job postings
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search jobs..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <h3 className="text-sm font-semibold">Filters</h3>
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="text-red-600 text-sm">
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="border px-3 py-2 rounded-lg" />
            <input placeholder="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="border px-3 py-2 rounded-lg" />
            <input placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} className="border px-3 py-2 rounded-lg" />

            <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="border px-3 py-2 rounded-lg">
              <option value="">All Job Types</option>
              {jobTypeOptions.map((item) => (
                <option key={item} value={item}>{formatLabel(item)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase">
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
                <td colSpan="5" className="text-center py-10">
                  <DocumentTextIcon className="h-10 w-10 mx-auto text-gray-300" />
                  <p>No jobs found</p>
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="px-4 py-3 text-blue-600 cursor-pointer" onClick={() => navigate(`/admin/managejob/${job.id}/analytics`)}>
                    {job.title}
                  </td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">{job.company?.companyName}</td>
                  <td className="px-4 py-3">{formatLabel(job.status)}</td>
                  <td className="px-4 py-3 text-center">
                    <JobActions job={job} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between p-4">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= totalPages}>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}