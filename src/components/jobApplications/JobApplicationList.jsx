import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApplicationsByRole } from "../../api/JobApplicationApi";
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
} from "@heroicons/react/24/outline";

export default function JobApplicationList() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const size = 10;
  const [totalPages, setTotalPages] = useState(0);
  const hasRestoredScroll = useRef(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", page],
    queryFn: () => getApplicationsByRole(page, size),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (data) {
      setApplications(data?.applications || []);
      setTotalPages(data?.totalPages ?? 0);
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("applications-scroll", window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasRestoredScroll.current) {
      const savedScroll = sessionStorage.getItem("applications-scroll");
      if (savedScroll) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScroll));
        }, 100);
      }
      hasRestoredScroll.current = true;
    }
  }, []);

  const handlePrevious = () => page > 0 && setPage(page - 1);
  const handleNext = () => page < totalPages - 1 && setPage(page + 1);

  const handleStatusUpdate = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.applicationId === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApps = applications.filter(
    (app) =>
      app.applicantName?.toLowerCase().includes(search.toLowerCase()) ||
      app.job?.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loader fullScreen={false} />;

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">
        Failed to load applications
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border";
    switch (status) {
      case "SELECTED":
        return `${base} bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700`;
      case "REJECTED":
        return `${base} bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700`;
      case "INTERVIEW":
        return `${base} bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700`;
      default:
        return `${base} bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-gray-600`;
    }
  };

  return (
    <div className="lwd-page py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold lwd-title">
              Job Applications
            </h1>
            <p className="lwd-text mt-1">
              Manage and review candidate applications
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 lwd-input"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {filteredApps.length === 0 ? (
            <div className="lwd-card text-center py-16">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg lwd-title">
                No applications found
              </h3>
              <p className="lwd-text">
                Try adjusting your search
              </p>
            </div>
          ) : (
            filteredApps.map((app) => {
              const js = app.jobSeeker;

              return (
                <div
                  key={app.applicationId}
                  className="lwd-card lwd-card-hover p-5"
                >
                  {/* HEADER */}
                  <div className="flex gap-4">
                    <div>
                      {app.applicantName ? (
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          {app.applicantName.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <UserCircleIcon className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                        className="lwd-link font-semibold cursor-pointer"
                      >
                        {app.applicantName}
                      </h3>
                      <p className="lwd-text">{js?.headline}</p>
                      <p className="text-xs lwd-text">
                        {js?.currentLocation}
                      </p>
                    </div>

                    <span className={getStatusBadge(app.status)}>
                      {app.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                    <div>
                      <p className="lwd-text text-xs">Experience</p>
                      <p className="font-medium">{js?.totalExperience} yrs</p>
                    </div>
                    <div>
                      <p className="lwd-text text-xs">Company</p>
                      <p className="font-medium">{js?.currentCompany}</p>
                    </div>
                    <div>
                      <p className="lwd-text text-xs">CTC</p>
                      <p className="font-medium">
                        ₹{js?.expectedCTC} LPA
                      </p>
                    </div>
                    <div>
                      <p className="lwd-text text-xs">Notice</p>
                      <p className="font-medium">
                        {js?.noticePeriod} days
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex justify-between mt-4 border-t pt-3 border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          navigate(`/profile/${app.jobSeekerId}`)
                        }
                        className="lwd-link"
                      >
                        View Profile
                      </button>
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

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <button
              onClick={handlePrevious}
              disabled={page === 0}
              className="lwd-btn-secondary"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>

            <span className="px-4 py-2 lwd-text">
              {page + 1} / {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className="lwd-btn-secondary"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}