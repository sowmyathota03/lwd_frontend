import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchApplications } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
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
          applicationSource: "",
          status: "",
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
      applicationSource: "",
      status: "",
      skills: "",
      dateFilter: "",
      specificDate: "",
      startDate: "",
      endDate: "",
    };
  }
};

const formatStatusLabel = (status) =>
  status
    ?.toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// Helper to get status badge color class
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "APPLIED":
      return "lwd-badge-primary";
    case "SHORTLISTED":
      return "lwd-badge-primary";
    case "INTERVIEW_SCHEDULED":
      return "lwd-badge-warning";
    case "SELECTED":
      return "lwd-badge-success";
    case "REJECTED":
      return "lwd-badge-danger";
    case "HIRED":
      return "lwd-badge-success";
    default:
      return "lwd-badge";
  }
};

export default function JobApplicationList() {
  const navigate = useNavigate();
  const hasRestoredScroll = useRef(false);
  const isFirstRender = useRef(true);
  const queryClient = useQueryClient();

  const savedState = getSavedState();

  const [page, setPage] = useState(savedState.page || 0);
  const [search, setSearch] = useState(savedState.search || "");
  const [applicationSource, setApplicationSource] = useState(
    savedState.applicationSource || "",
  );
  const [status, setStatus] = useState(savedState.status || "");
  const [skills, setSkills] = useState(savedState.skills || "");
  const [dateFilter, setDateFilter] = useState(savedState.dateFilter || "");
  const [specificDate, setSpecificDate] = useState(
    savedState.specificDate || "",
  );
  const [startDate, setStartDate] = useState(savedState.startDate || "");
  const [endDate, setEndDate] = useState(savedState.endDate || "");

  const size = 10;

  const filters = useMemo(
    () => ({
      keyword: search.trim() || null,
      applicationSource: applicationSource || null,
      status: status || null,
      skills: skills.trim() || null,
      dateFilter: dateFilter || null,
      specificDate:
        dateFilter === "SPECIFIC_DATE" ? specificDate || null : null,
      startDate: dateFilter === "CUSTOM_RANGE" ? startDate || null : null,
      endDate: dateFilter === "CUSTOM_RANGE" ? endDate || null : null,
    }),
    [
      search,
      applicationSource,
      status,
      skills,
      dateFilter,
      specificDate,
      startDate,
      endDate,
    ],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", page, filters],
    queryFn: () => searchApplications(filters, page, size),
    placeholderData: (prev) => prev,
  });

  const applications = data?.applications || [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        page,
        search,
        applicationSource,
        status,
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
    applicationSource,
    status,
    skills,
    dateFilter,
    specificDate,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(0);
  }, [
    search,
    applicationSource,
    status,
    skills,
    dateFilter,
    specificDate,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasRestoredScroll.current && !isLoading) {
      const saved = sessionStorage.getItem(SCROLL_KEY);
      if (saved) window.scrollTo(0, parseInt(saved));
      hasRestoredScroll.current = true;
    }
  }, [isLoading]);

  const handleNext = () => page < totalPages - 1 && setPage((p) => p + 1);
  const handlePrevious = () => page > 0 && setPage((p) => p - 1);

  const handleResetFilters = () => {
    setSearch("");
    setApplicationSource("");
    setStatus("");
    setSkills("");
    setDateFilter("");
    setSpecificDate("");
    setStartDate("");
    setEndDate("");
    setPage(0);
  };

  const handleStatusUpdated = (applicationId, newStatus) => {
    queryClient.setQueryData(["applications", page, filters], (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        applications: oldData.applications.map((app) =>
          app.applicationId === applicationId
            ? { ...app, status: newStatus }
            : app,
        ),
      };
    });
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="lwd-page flex items-center justify-center h-64">
        <div className="lwd-card text-center text-red-600 dark:text-red-400">
          Failed to load applications. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="lwd-page p-6 space-y-6">
      {/* FILTERS CARD */}
      <div className="lwd-card space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h2 className="lwd-title">Filters</h2>
          </div>

          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="lwd-input pl-10"
              placeholder="Search by candidate, job, company..."
            />
          </div>
        </div>

        {/* FILTER CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={applicationSource}
            onChange={(e) => setApplicationSource(e.target.value)}
            className="lwd-input"
          >
            <option value="">All Sources</option>
            <option value="PORTAL">Portal</option>
            <option value="EXTERNAL">External</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="lwd-input"
          >
            <option value="">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="SELECTED">Selected</option>
            <option value="REJECTED">Rejected</option>
            <option value="HIRED">Hired</option>
          </select>

          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="lwd-input"
            placeholder="Filter by skills"
          />

          <select
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setSpecificDate("");
              setStartDate("");
              setEndDate("");
            }}
            className="lwd-input"
          >
            <option value="">All Dates</option>
            <option value="TODAY">Today</option>
            <option value="LAST_WEEK">Last Week</option>
            <option value="LAST_MONTH">Last Month</option>
            <option value="SPECIFIC_DATE">Specific Date</option>
            <option value="CUSTOM_RANGE">Custom Range</option>
          </select>

          {dateFilter === "SPECIFIC_DATE" && (
            <input
              type="date"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
              className="lwd-input"
            />
          )}

          {dateFilter === "CUSTOM_RANGE" && (
            <>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="lwd-input"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="lwd-input"
              />
            </>
          )}
        </div>

        <div className="flex justify-end">
          <button onClick={handleResetFilters} className="lwd-btn-outline">
            Reset Filters
          </button>
        </div>
      </div>

      {/* APPLICATIONS LIST */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="lwd-card text-center py-12">
            <UserCircleIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
            <p className="lwd-text mt-3">No applications found</p>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.applicationId}
              className="lwd-card lwd-card-hover group"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  <UserCircleIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 shrink-0" />

                  <div className="min-w-0 flex-1">
                    <h3
                      onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                      className="font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline truncate"
                    >
                      {app.applicantName}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {app.job?.title}
                    </p>
                  </div>
                </div>

                <span
                  className={`${getStatusBadgeClass(
                    app.status,
                  )} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                >
                  {formatStatusLabel(app.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Exp: {app.jobSeeker?.totalExperience ?? 0} yrs</p>
                <p>CTC: ₹{app.jobSeeker?.expectedCTC ?? 0}</p>
                <p>Company: {app.company?.companyName || "—"}</p>
                <p>Date: {app.appliedAt?.slice(0, 10)}</p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2">
                <button
                  onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                  className="lwd-btn-outline text-sm"
                >
                  View Profile
                </button>

                <ApplicationStatusDropdown
                  applicationId={app.applicationId}
                  currentStatus={app.status}
                  onStatusUpdated={handleStatusUpdated}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-4">
          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className="lwd-pagination inline-flex items-center gap-1 disabled:opacity-50"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </button>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className="lwd-pagination inline-flex items-center gap-1 disabled:opacity-50"
          >
            Next
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
