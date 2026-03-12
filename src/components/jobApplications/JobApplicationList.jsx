import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApplicationsByRole } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";

// Heroicons (install with: npm install @heroicons/react)
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


  // ================= REACT QUERY =================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["applications", page],
    queryFn: () => getApplicationsByRole(page, size),
    keepPreviousData: true,

    // 🔥 prevents refetch when coming back
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });


  // ================= SET DATA =================
  useEffect(() => {
    if (data) {
      setApplications(data?.applications || []);
      setTotalPages(data?.totalPages ?? 0);
    }
  }, [data]);


  // ================= SAVE SCROLL =================
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(
        "applications-scroll",
        window.scrollY.toString()
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ================= RESTORE SCROLL =================
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


  // ================= PAGINATION =================
  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  // ================= STATUS UPDATE =================
  const handleStatusUpdate = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.applicationId === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // ================= SEARCH (FRONTEND TEMPORARY) =================
  const filteredApps = applications.filter(
    (app) =>
      app.applicantName?.toLowerCase().includes(search.toLowerCase()) ||
      app.job?.title?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= LOADING =================
  if (isLoading) return <Loader fullScreen={false} />;

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-lg">
        <p className="font-semibold">Failed to load applications</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    );
  }

  // Helper for status badge styles
  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "SELECTED":
        return `${base} bg-green-100 text-green-800 border border-green-200`;
      case "REJECTED":
        return `${base} bg-red-100 text-red-800 border border-red-200`;
      case "INTERVIEW":
        return `${base} bg-yellow-100 text-yellow-800 border border-yellow-200`;
      default:
        return `${base} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Job Applications
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and review candidate applications
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-80">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidate or job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* ================= APPLICATION LIST ================= */}
        <div className="space-y-4">
          {filteredApps.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No applications found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or check back later.
              </p>
            </div>
          ) : (
            filteredApps.map((app) => {
              const js = app.jobSeeker;

              return (
                <div
                  key={app.applicationId}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* HEADER */}
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
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
                        onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
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

                    {/* Status Badge */}
                    <span className={getStatusBadge(app.status)}>
                      {app.status}
                    </span>
                  </div>

                  {/* DETAILS GRID */}
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

                  {/* APPLICATION DETAILS */}
                  <div className="border-t border-gray-100 mt-4 pt-4 text-sm grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <BriefcaseIcon className="h-3 w-3" /> Applied For
                      </p>
                      <p className="font-medium text-gray-900 truncate">
                        {app.job?.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <BuildingOfficeIcon className="h-3 w-3" /> Company
                      </p>
                      <p className="font-medium text-gray-900 truncate">
                        {app.company?.companyName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" /> Applied On
                      </p>
                      <p className="font-medium text-gray-900">
                        {new Date(app.appliedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <GlobeAltIcon className="h-3 w-3" /> Source
                      </p>
                      <p className="font-medium text-gray-900">
                        {app.applicationSource}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap justify-between items-center mt-4 pt-2 border-t border-gray-100">
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          sessionStorage.setItem(
                            "applications-scroll",
                            window.scrollY.toString()
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

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            <button
              onClick={handlePrevious}
              disabled={page === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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