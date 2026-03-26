import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchApplications } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
      };
  } catch {
    return { page: 0, search: "" };
  }
};

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

  const size = 10;

  const filters = useMemo(
    () => ({
      keyword: search.trim() || null,
    }),
    [search]
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
      JSON.stringify({ page, search })
    );
  }, [page, search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(0);
  }, [search]);

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

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Failed to load
      </div>
    );

  return (
    <div className="lwd-page space-y-6">

      {/* HEADER */}
      <div className="lwd-card flex flex-col md:flex-row justify-between gap-4 items-center">

        <h1 className="lwd-title">Job Applications</h1>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="lwd-input pl-10"
            placeholder="Search applications..."
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="lwd-card text-center text-gray-500 dark:text-gray-400 py-10">
            No applications found
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.applicationId}
              className="lwd-card hover:shadow-lg transition-all"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">

                <div className="flex gap-3">
                  <UserCircleIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />

                  <div>
                    <h3
                      onClick={() =>
                        navigate(`/profile/${app.jobSeekerId}`)
                      }
                      className="font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
                    >
                      {app.applicantName}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {app.job?.title}
                    </p>
                  </div>
                </div>

                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {formatStatusLabel(app.status)}
                </span>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">

                <p>Exp: {app.jobSeeker?.totalExperience} yrs</p>
                <p>CTC: ₹{app.jobSeeker?.expectedCTC}</p>
                <p>Company: {app.company?.companyName}</p>
                <p>Date: {app.appliedAt?.slice(0, 10)}</p>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center mt-4">

                <button
                  onClick={() =>
                    navigate(`/profile/${app.jobSeekerId}`)
                  }
                  className="lwd-btn-outline text-sm"
                >
                  View Profile
                </button>

                <ApplicationStatusDropdown
                  applicationId={app.applicationId}
                  currentStatus={app.status}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">

          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className="lwd-btn-outline"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages - 1}
            className="lwd-btn-outline"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}