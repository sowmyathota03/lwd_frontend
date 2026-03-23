import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchApplications } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CalendarIcon,
  GlobeAltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const STORAGE_KEY = "job-applications-state";
const SCROLL_KEY = "job-applications-scroll";

const getSavedState = () => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          page: 0,
          search: "",
          status: "",
          applicationSource: "",
          skills: "",
          dateFilter: "",
          specificDate: "",
          startDate: "",
          endDate: "",
        };
  } catch {
    return {
      page: 0,
      search: "",
      status: "",
      applicationSource: "",
      skills: "",
      dateFilter: "",
      specificDate: "",
      startDate: "",
      endDate: "",
    };
  }
};

const statusOptions = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "SELECTED",
  "REJECTED",
  "HIRED",
];

const formatStatusLabel = (status) =>
  status
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function JobApplicationList() {
  const navigate = useNavigate();
  const hasRestoredScroll = useRef(false);
  const isFirstRender = useRef(true);

  const savedState = getSavedState();

  const [page, setPage] = useState(savedState.page || 0);
  const [search, setSearch] = useState(savedState.search || "");
  const [status, setStatus] = useState(savedState.status || "");
  const [applicationSource, setApplicationSource] = useState(
    savedState.applicationSource || "",
  );
  const [skills, setSkills] = useState(savedState.skills || "");
  const [dateFilter, setDateFilter] = useState(savedState.dateFilter || "");
  const [specificDate, setSpecificDate] = useState(savedState.specificDate || "");
  const [startDate, setStartDate] = useState(savedState.startDate || "");
  const [endDate, setEndDate] = useState(savedState.endDate || "");
  const size = 10;

  const filters = useMemo(
    () => ({
      keyword: search.trim() || null,
      status: status || null,
      applicationSource: applicationSource || null,
      skills: skills.trim() || null,
      dateFilter: dateFilter || null,
      specificDate:
        dateFilter === "SPECIFIC_DATE" ? specificDate || null : null,
      startDate: dateFilter === "CUSTOM_RANGE" ? startDate || null : null,
      endDate: dateFilter === "CUSTOM_RANGE" ? endDate || null : null,
    }),
    [
      search,
      status,
      applicationSource,
      skills,
      dateFilter,
      specificDate,
      startDate,
      endDate,
    ],
  );

  const hasActiveFilters = !!(
    search.trim() ||
    status ||
    applicationSource ||
    skills.trim() ||
    dateFilter ||
    specificDate ||
    startDate ||
    endDate
  );

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "applications",
      page,
      size,
      filters.keyword,
      filters.status,
      filters.applicationSource,
      filters.skills,
      filters.dateFilter,
      filters.specificDate,
      filters.startDate,
      filters.endDate,
    ],
    queryFn: () => searchApplications(filters, page, size),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const applications = data?.applications || [];
  const totalPages = data?.totalPages ?? 0;

  // Save page + filters
  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        page,
        search,
        status,
        applicationSource,
        skills,
        dateFilter,
        specificDate,
        startDate,
        endDate,
      }),
    );
  }, [
    page,
    search,
    status,
    applicationSource,
    skills,
    dateFilter,
    specificDate,
    startDate,
    endDate,
  ]);

  // Reset page only when filters change by user, not on first restore
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(0);
  }, [
    search,
    status,
    applicationSource,
    skills,
    dateFilter,
    specificDate,
    startDate,
    endDate,
  ]);

  // Save scroll while scrolling
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Restore scroll after data is ready
  useEffect(() => {
    if (!hasRestoredScroll.current && !isLoading) {
      const savedScroll = sessionStorage.getItem(SCROLL_KEY);
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedScroll, 10));
        });
      }
      hasRestoredScroll.current = true;
    }
  }, [isLoading]);

  const handlePrevious = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handleStatusUpdate = (id, newStatus) => {
    // optimistic only in UI view
    // better handled by query invalidation after mutation if needed
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setApplicationSource("");
    setSkills("");
    setDateFilter("");
    setSpecificDate("");
    setStartDate("");
    setEndDate("");
    setPage(0);
    sessionStorage.removeItem(SCROLL_KEY);
  };

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border";

    switch (status) {
      case "APPLIED":
        return `${base} bg-gray-100 text-gray-800 border-gray-200`;
      case "SHORTLISTED":
        return `${base} bg-blue-100 text-blue-800 border-blue-200`;
      case "INTERVIEW_SCHEDULED":
        return `${base} bg-yellow-100 text-yellow-800 border-yellow-200`;
      case "SELECTED":
        return `${base} bg-green-100 text-green-800 border-green-200`;
      case "REJECTED":
        return `${base} bg-red-100 text-red-800 border-red-200`;
      case "HIRED":
        return `${base} bg-emerald-100 text-emerald-800 border-emerald-200`;
      default:
        return `${base} bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  if (isLoading) return <Loader fullScreen={false} />;

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">
        <p className="font-semibold">Failed to load applications</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Job Applications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and review candidate applications
            </p>
          </div>

          <div className="relative w-full lg:w-96">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidate, job title, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">
                Search Filters
              </h2>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <XMarkIcon className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {statusOptions.map((item) => (
                  <option key={item} value={item}>
                    {formatStatusLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Application Source
              </label>
              <select
                value={applicationSource}
                onChange={(e) => setApplicationSource(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sources</option>
                <option value="PORTAL">Portal</option>
                <option value="EXTERNAL">External</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Skills
              </label>
              <input
                type="text"
                placeholder="e.g. React, Java, Spring"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Applied Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setSpecificDate("");
                  setStartDate("");
                  setEndDate("");
                }}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Dates</option>
                <option value="TODAY">Today</option>
                <option value="LAST_WEEK">Last Week</option>
                <option value="LAST_MONTH">Last Month</option>
                <option value="SPECIFIC_DATE">Specific Date</option>
                <option value="CUSTOM_RANGE">Custom Range</option>
              </select>
            </div>
          </div>

          {dateFilter === "SPECIFIC_DATE" && (
            <div className="max-w-sm">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Specific Date
              </label>
              <input
                type="date"
                value={specificDate}
                onChange={(e) => setSpecificDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {dateFilter === "CUSTOM_RANGE" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {isFetching && (
          <div className="text-sm text-gray-500">Updating applications...</div>
        )}

        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No applications found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {hasActiveFilters
                  ? "Try changing your search or filters."
                  : "No applications are available right now."}
              </p>
            </div>
          ) : (
            applications.map((app) => {
              const js = app.jobSeeker;

              return (
                <div
                  key={app.applicationId}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {app.applicantName ? (
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                          {app.applicantName.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <UserCircleIcon className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        onClick={() => {
                          sessionStorage.setItem(
                            SCROLL_KEY,
                            window.scrollY.toString(),
                          );
                          navigate(`/profile/${app.jobSeekerId}`);
                        }}
                        className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors truncate"
                      >
                        {app.applicantName || "Unknown Candidate"}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {js?.headline || "Professional"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {js?.currentLocation || "Location not specified"}
                      </p>
                    </div>

                    <span className={getStatusBadge(app.status)}>
                      {formatStatusLabel(app.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Experience</p>
                        <p className="font-medium text-gray-900">
                          {js?.totalExperience ?? 0} yrs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Current Company</p>
                        <p className="font-medium text-gray-900">
                          {js?.currentCompany || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CurrencyRupeeIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Expected CTC</p>
                        <p className="font-medium text-gray-900">
                          {js?.expectedCTC ? `₹${js.expectedCTC} LPA` : "-"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500 text-xs">Notice Period</p>
                        <p className="font-medium text-gray-900">
                          {js?.noticePeriod ?? "-"} days
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 mt-4 pt-4 text-sm grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <BriefcaseIcon className="h-3 w-3" /> Applied For
                      </p>
                      <p className="font-medium text-gray-900 truncate">
                        {app.job?.title || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <BuildingOfficeIcon className="h-3 w-3" /> Company
                      </p>
                      <p className="font-medium text-gray-900 truncate">
                        {app.company?.companyName ||
                          app.job?.company?.companyName ||
                          "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" /> Applied On
                      </p>
                      <p className="font-medium text-gray-900">
                        {app.appliedAt
                          ? new Date(app.appliedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <GlobeAltIcon className="h-3 w-3" /> Source
                      </p>
                      <p className="font-medium text-gray-900">
                        {app.applicationSource || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-4 pt-2 border-t border-gray-100 gap-3">
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          sessionStorage.setItem(
                            SCROLL_KEY,
                            window.scrollY.toString(),
                          );
                          navigate(`/profile/${app.jobSeekerId}`);
                        }}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Profile
                      </button>

                      {js?.resumeUrl && (
                        <a
                          href={js.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                        >
                          Resume
                        </a>
                      )}
                    </div>

                    <ApplicationStatusDropdown
                      applicationId={app.applicationId}
                      currentStatus={app.status}
                      onStatusUpdated={handleStatusUpdate}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            <button
              onClick={handlePrevious}
              disabled={page === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </button>

            <span className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-xl">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}