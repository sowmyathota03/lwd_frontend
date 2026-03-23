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
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
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
    savedState.applicationSource || ""
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
      specificDate: dateFilter === "SPECIFIC_DATE" ? specificDate || null : null,
      startDate: dateFilter === "CUSTOM_RANGE" ? startDate || null : null,
      endDate: dateFilter === "CUSTOM_RANGE" ? endDate || null : null,
    }),
    [search, status, applicationSource, skills, dateFilter, specificDate, startDate, endDate]
  );

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["applications", page, filters],
    queryFn: () => searchApplications(filters, page, size),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  const applications = data?.applications || [];
  const totalPages = data?.totalPages ?? 0;

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
      })
    );
  }, [page, search, status, applicationSource, skills, dateFilter, specificDate, startDate, endDate]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(0);
  }, [search, status, applicationSource, skills, dateFilter, specificDate, startDate, endDate]);

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
  };

  const handleNext = () => page < totalPages - 1 && setPage((p) => p + 1);
  const handlePrevious = () => page > 0 && setPage((p) => p - 1);

  if (isLoading) return <Loader />;

  if (isError) return <div className="text-red-500 text-center">Failed to load</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Job Applications</h1>

      {/* Search */}
      <div className="relative w-full md:w-96">
        <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded w-full"
          placeholder="Search..."
        />
      </div>

      {/* Cards */}
      {applications.map((app) => (
        <div key={app.applicationId} className="border p-4 rounded-lg shadow">

          <div className="flex justify-between">
            <div className="flex gap-3">
              <UserCircleIcon className="w-10 h-10 text-gray-400" />
              <div>
                <h3
                  onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                  className="font-semibold cursor-pointer text-blue-600"
                >
                  {app.applicantName}
                </h3>
                <p className="text-sm">{app.job?.title}</p>
              </div>
            </div>

            <span className="text-sm">{formatStatusLabel(app.status)}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 mt-4 text-sm gap-4">
            <p>Exp: {app.jobSeeker?.totalExperience} yrs</p>
            <p>CTC: ₹{app.jobSeeker?.expectedCTC}</p>
            <p>Company: {app.company?.companyName}</p>
            <p>Date: {app.appliedAt?.slice(0, 10)}</p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
              className="text-blue-500"
            >
              View Profile
            </button>

            <ApplicationStatusDropdown
              applicationId={app.applicationId}
              currentStatus={app.status}
            />
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-4">
        <button onClick={handlePrevious} disabled={page === 0}>
          <ChevronLeftIcon className="w-5" />
        </button>

        <span>
          {page + 1} / {totalPages}
        </span>

        <button onClick={handleNext} disabled={page === totalPages - 1}>
          <ChevronRightIcon className="w-5" />
        </button>
      </div>
    </div>
  );
}