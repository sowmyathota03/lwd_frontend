import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  approveRecruiter,
  blockRecruiter,
  getRecruitersByCompanyId,
} from "../api/AdminApi";
import { Search, RefreshCw, Eye, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react";

export default function RecruitersListPage() {
  const { companyId } = useParams();

  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [confirm, setConfirm] = useState({
    open: false,
    recruiter: null,
    action: null, // 'APPROVE', 'BLOCK', 'UNBLOCK'
  });

  // Fetch recruiters
  const fetchRecruiters = async () => {
    setLoading(true);
    try {
      const data = await getRecruitersByCompanyId(companyId);
      setRecruiters(data || []);
      setFilteredRecruiters(data || []);
    } catch (err) {
      console.error("Failed to load recruiters", err);
      toast.error("Could not load recruiters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, [companyId]);

  // Filter recruiters based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecruiters(recruiters);
    } else {
      const lower = searchTerm.toLowerCase();
      const filtered = recruiters.filter(
        (r) =>
          r.name?.toLowerCase().includes(lower) ||
          r.email?.toLowerCase().includes(lower)
      );
      setFilteredRecruiters(filtered);
    }
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, recruiters]);

  // Pagination
  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);
  const paginatedRecruiters = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecruiters.slice(start, start + itemsPerPage);
  }, [filteredRecruiters, currentPage]);

  const openConfirm = (recruiter, action) => {
    setConfirm({ open: true, recruiter, action });
  };

  const closeConfirm = () => {
    setConfirm({ open: false, recruiter: null, action: null });
  };

  const handleAction = async () => {
    const { recruiter, action } = confirm;
    if (!recruiter) return;

    setActionLoadingId(recruiter.id);
    const toastId = toast.loading("Processing...");

    try {
      let updated;

      if (action === "APPROVE") {
        updated = await approveRecruiter(recruiter.id);
        toast.success("Recruiter approved successfully!", { id: toastId });
      } else if (action === "BLOCK") {
        updated = await blockRecruiter(recruiter.id, true);
        toast.success("Recruiter blocked.", { id: toastId });
      } else if (action === "UNBLOCK") {
        updated = await blockRecruiter(recruiter.id, false);
        toast.success("Recruiter unblocked.", { id: toastId });
      }

      // Update list with new status
      setRecruiters((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
    } catch (err) {
      console.error("Action failed", err);
      toast.error("Action failed. Please try again.", { id: toastId });
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "ACTIVE":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case "SUSPENDED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Suspended
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Recruiters</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage recruiters in your organization
            </p>
          </div>
          <button
            onClick={fetchRecruiters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
              <p className="mt-2 text-sm text-gray-500">Loading recruiters...</p>
            </div>
          ) : paginatedRecruiters.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No recruiters found</h3>
              <p className="text-sm text-gray-500 mt-1">
                {searchTerm
                  ? "Try adjusting your search"
                  : "There are no recruiters in this company yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedRecruiters.map((recruiter) => (
                      <tr key={recruiter.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {recruiter.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {recruiter.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(recruiter.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {recruiter.status === "PENDING" && (
                              <button
                                onClick={() => openConfirm(recruiter, "APPROVE")}
                                disabled={actionLoadingId === recruiter.id}
                                className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                              >
                                Approve
                              </button>
                            )}
                            {recruiter.status === "ACTIVE" && (
                              <button
                                onClick={() => openConfirm(recruiter, "BLOCK")}
                                disabled={actionLoadingId === recruiter.id}
                                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                              >
                                Block
                              </button>
                            )}
                            {recruiter.status === "SUSPENDED" && (
                              <button
                                onClick={() => openConfirm(recruiter, "UNBLOCK")}
                                disabled={actionLoadingId === recruiter.id}
                                className="inline-flex items-center px-3 py-1.5 bg-yellow-600 text-white text-xs rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
                              >
                                Unblock
                              </button>
                            )}
                            <button
                              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Jobs
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * itemsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredRecruiters.length
                      )}
                    </span>{" "}
                    of <span className="font-medium">{filteredRecruiters.length}</span>{" "}
                    results
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm {confirm.action?.toLowerCase()}
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span className="font-medium text-gray-900">
                {confirm.action?.toLowerCase()}
              </span>{" "}
              recruiter{" "}
              <span className="font-medium text-gray-900">
                {confirm.recruiter.name}
              </span>
              ? This action can be reversed later.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={actionLoadingId === confirm.recruiter.id}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
              >
                {actionLoadingId === confirm.recruiter.id && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                )}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

