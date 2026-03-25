import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  approveRecruiter,
  blockRecruiter,
  getRecruitersByCompanyId,
} from "../api/AdminApi";
import {
  Search,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from "lucide-react";

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
    action: null,
  });

  // Fetch recruiters
  const fetchRecruiters = async () => {
    setLoading(true);
    try {
      const data = await getRecruitersByCompanyId(companyId);
      setRecruiters(data || []);
      setFilteredRecruiters(data || []);
    } catch (err) {
      toast.error("Could not load recruiters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, [companyId]);

  // Search
  useEffect(() => {
    const filtered = recruiters.filter(
      (r) =>
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecruiters(filtered);
    setCurrentPage(1);
  }, [searchTerm, recruiters]);

  // Pagination
  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);

  const paginatedRecruiters = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecruiters.slice(start, start + itemsPerPage);
  }, [filteredRecruiters, currentPage]);

  // Actions
  const openConfirm = (recruiter, action) =>
    setConfirm({ open: true, recruiter, action });

  const closeConfirm = () =>
    setConfirm({ open: false, recruiter: null, action: null });

  const handleAction = async () => {
    const { recruiter, action } = confirm;
    if (!recruiter) return;

    setActionLoadingId(recruiter.id);
    const toastId = toast.loading("Processing...");

    try {
      let updated;

      if (action === "APPROVE") {
        updated = await approveRecruiter(recruiter.id);
      } else if (action === "BLOCK") {
        updated = await blockRecruiter(recruiter.id, true);
      } else {
        updated = await blockRecruiter(recruiter.id, false);
      }

      setRecruiters((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );

      toast.success("Action completed!", { id: toastId });
    } catch {
      toast.error("Action failed", { id: toastId });
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  // Status Badge
  const getStatusBadge = (status) => {
    const base = "inline-flex items-center px-2 py-1 text-xs rounded-md";

    switch (status) {
      case "PENDING":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300`}>
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "ACTIVE":
        return (
          <span className={`${base} bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300`}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case "SUSPENDED":
        return (
          <span className={`${base} bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300`}>
            <XCircle className="w-3 h-3 mr-1" />
            Suspended
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="lwd-page px-4 py-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="lwd-title text-2xl">Company Recruiters</h1>
            <p className="lwd-text">Manage recruiters in your organization</p>
          </div>

          <button onClick={fetchRecruiters} className="lwd-btn-secondary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="lwd-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="lwd-card overflow-hidden">
          {loading ? (
            <div className="text-center py-10 lwd-loader">Loading recruiters...</div>
          ) : paginatedRecruiters.length === 0 ? (
            <div className="text-center py-10">
              <Users className="mx-auto w-10 h-10 text-gray-400" />
              <p className="lwd-text mt-2">No recruiters found</p>
            </div>
          ) : (
            <>
              <table className="lwd-table">
                <thead className="lwd-table-header">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedRecruiters.map((r) => (
                    <tr key={r.id} className="lwd-table-row hover:bg-gray-50 dark:hover:bg-slate-800">
                      <td className="px-4 py-2">{r.name}</td>
                      <td className="px-4 py-2">{r.email}</td>
                      <td className="px-4 py-2">{getStatusBadge(r.status)}</td>

                      <td className="px-4 py-2 flex gap-2">
                        {r.status === "PENDING" && (
                          <button
                            onClick={() => openConfirm(r, "APPROVE")}
                            className="lwd-btn-primary text-xs"
                          >
                            Approve
                          </button>
                        )}

                        {r.status === "ACTIVE" && (
                          <button
                            onClick={() => openConfirm(r, "BLOCK")}
                            className="lwd-btn-secondary text-xs"
                          >
                            Block
                          </button>
                        )}

                        {r.status === "SUSPENDED" && (
                          <button
                            onClick={() => openConfirm(r, "UNBLOCK")}
                            className="lwd-btn-secondary text-xs"
                          >
                            Unblock
                          </button>
                        )}

                        <button className="lwd-btn-primary text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                    className="lwd-btn-secondary"
                  >
                    Prev
                  </button>

                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                    className="lwd-btn-secondary"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {confirm.open && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">
                Confirm {confirm.action?.toLowerCase()}
              </h3>
            </div>

            <div className="modal-body">
              <p>
                Are you sure you want to{" "}
                <strong>{confirm.action?.toLowerCase()}</strong>{" "}
                {confirm.recruiter?.name}?
              </p>
            </div>

            <div className="modal-footer">
              <button onClick={closeConfirm} className="btn-secondary">
                Cancel
              </button>

              <button onClick={handleAction} className="btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}