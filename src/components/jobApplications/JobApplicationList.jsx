import { useEffect, useState, useCallback } from "react";
import { getApplicationsByRole } from "../../api/JobApplicationApi";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import ApplicationStatusDropdown from "./ApplicationStatusDropdown";
import { ChevronDown } from "lucide-react";

export default function JobApplicationList() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [filters, setFilters] = useState({
    applicant: "",
    email: "",
    job: "",
    company: "",
    status: "",
    appliedDate: ""
  });
  const [searchText, setSearchText] = useState({
    applicant: "",
    email: "",
    job: "",
    company: ""
  });
  const [showFilter, setShowFilter] = useState(null);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getApplicationsByRole(page, size);
      const apps = data?.applications || [];
      setApplications(apps);
      setFilteredApps(apps);
      setTotalPages(data?.totalPages ?? 0);
    } catch (error) {
      console.error("Failed to fetch applications", error);
      setApplications([]);
      setFilteredApps([]);
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  useEffect(() => {
    let result = applications;

    if (filters.applicant)
      result = result.filter((a) =>
        a.applicantName?.toLowerCase().includes(filters.applicant.toLowerCase())
      );

    if (filters.email)
      result = result.filter((a) =>
        a.email?.toLowerCase().includes(filters.email.toLowerCase())
      );

    if (filters.job)
      result = result.filter((a) =>
        a.job?.title?.toLowerCase().includes(filters.job.toLowerCase())
      );

    if (filters.company)
      result = result.filter((a) =>
        a.company?.companyName?.toLowerCase().includes(filters.company.toLowerCase())
      );

    if (filters.status)
      result = result.filter((a) => a.status === filters.status);

    if (filters.appliedDate)
      result = result.filter((a) =>
        new Date(a.appliedAt).toISOString().slice(0, 10) === filters.appliedDate
      );

    setFilteredApps(result);
  }, [filters, applications]);

  const getSuggestions = (key) => {
    const values = applications.map((a) => {
      if (key === "applicant") return a.applicantName;
      if (key === "email") return a.email;
      if (key === "job") return a.job?.title;
      if (key === "company") return a.company?.companyName;
      return null;
    });
    return [...new Set(values.filter(Boolean))];
  };

  const renderFilter = (key) => {
    if (key === "status") {
      return (
        <div className="absolute bg-white border shadow-md p-2 z-10 w-44">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border text-xs w-full p-1"
          >
            <option value="">All</option>
            <option value="APPLIED">APPLIED</option>
            <option value="SHORTLISTED">SHORTLISTED</option>
            <option value="INTERVIEW">INTERVIEW</option>
            <option value="SELECTED">SELECTED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      );
    }

    if (key === "appliedDate") {
      return (
        <div className="absolute bg-white border shadow-md p-2 z-10 w-44">
          <input
            type="date"
            value={filters.appliedDate}
            onChange={(e) => setFilters({ ...filters, appliedDate: e.target.value })}
            className="border text-xs w-full p-1"
          />
        </div>
      );
    }

    return (
      <div className="absolute bg-white border shadow-md p-2 z-10 w-52">
        <input
          type="text"
          placeholder="Search..."
          value={searchText[key] || ""}
          onChange={(e) =>
            setSearchText({ ...searchText, [key]: e.target.value })
          }
          className="border text-xs w-full p-1 mb-2"
        />
        {searchText[key] && (
          <div className="max-h-40 overflow-y-auto border-t">
            {getSuggestions(key)
              .filter((item) =>
                item?.toLowerCase().includes(searchText[key].toLowerCase())
              )
              .map((item, i) => (
                <div
                  key={i}
                  className="text-xs cursor-pointer hover:bg-gray-100 p-1"
                  onClick={() => {
                    setFilters({ ...filters, [key]: item });
                    setSearchText({ ...searchText, [key]: item });
                    setShowFilter(null);
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const Header = ({ label, keyName }) => (
    <th className="px-4 py-2 relative">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setShowFilter(showFilter === keyName ? null : keyName)}
      >
        {label}
        <ChevronDown size={14} />
      </div>
      {showFilter === keyName && renderFilter(keyName)}
    </th>
  );

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <div className="md:p-4 p-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Job Applications</h2>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <Header label="Applicant" keyName="applicant" />
              <Header label="Email" keyName="email" />
              <Header label="Job Title" keyName="job" />
              <Header label="Company" keyName="company" />
              <Header label="Status" keyName="status" />
              <Header label="Applied Date" keyName="appliedDate" />
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-6">
                  <Loader fullScreen={false} />
                </td>
              </tr>
            ) : filteredApps.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.applicationId} className="hover:bg-gray-50">
                  <td
                    className="text-blue-600 p-2 cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                  >
                    {app.applicantName}
                  </td>
                  <td
                    className="text-blue-600 p-2 cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${app.jobSeekerId}`)}
                  >
                    {app.email}
                  </td>
                  <td className="px-4 py-2 text-blue-600 cursor-pointer hover:underline"
                      onClick={() => app.job?.id && navigate(`/admin/managejob/${app.job.id}/analytics`)}>
                    {app.job?.title || "-"}
                  </td>
                  <td className="px-4 py-2">{app.company?.companyName || "-"}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                        app.applicationSource === "EXTERNAL"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {app.applicationSource || "PORTAL"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString("en-IN") : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <ApplicationStatusDropdown
                      applicationId={app.applicationId}
                      currentStatus={app.status}
                      onStatusUpdated={(id, newStatus) => {
                        setApplications((prev) =>
                          prev.map((a) => (a.applicationId === id ? { ...a, status: newStatus } : a))
                        );
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center px-6 py-4 border-t gap-4 border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={page === 0}
            className="px-4 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page + 1 >= totalPages}
            className="px-4 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
