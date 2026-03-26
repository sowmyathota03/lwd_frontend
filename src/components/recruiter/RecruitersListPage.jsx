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

  /* ================= FETCH ================= */
  const fetchRecruiters = async () => {
    setLoading(true);
    try {
      const data = await getRecruitersByCompanyId(companyId);
      setRecruiters(data || []);
      setFilteredRecruiters(data || []);
    } catch {
      toast.error("Could not load recruiters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, [companyId]);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const filtered = recruiters.filter(
      (r) =>
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecruiters(filtered);
    setCurrentPage(1);
  }, [searchTerm, recruiters]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);

  const paginatedRecruiters = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecruiters.slice(start, start + itemsPerPage);
  }, [filteredRecruiters, currentPage]);

  /* ================= ACTIONS ================= */
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

  /* ================= STATUS BADGE ================= */
  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="lwd-badge bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 flex items-center gap-1">
            <AlertCircle size={12} /> Pending
          </span>
        );
      case "ACTIVE":
        return (
          <span className="lwd-badge bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 flex items-center gap-1">
            <CheckCircle size={12} /> Active
          </span>
        );
      case "SUSPENDED":
        return (
          <span className="lwd-badge bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 flex items-center gap-1">
            <XCircle size={12} /> Suspended
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="lwd-page p-6">

      <div className="lwd-container space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="lwd-page-title">Company Recruiters</h1>
            <p className="lwd-text">Manage recruiters in your organization</p>
          </div>

          <button
            onClick={fetchRecruiters}
            className="lwd-btn-secondary flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* SEARCH */}
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

        {/* TABLE */}
        <div className="lwd-card overflow-hidden">

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="lwd-loader"></div>
            </div>
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
                    <th className="lwd-th">Name</th>
                    <th className="lwd-th">Email</th>
                    <th className="lwd-th">Status</th>
                    <th className="lwd-th">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedRecruiters.map((r) => (
                    <tr key={r.id} className="lwd-table-row">
                      <td className="lwd-td">{r.name}</td>
                      <td className="lwd-td">{r.email}</td>
                      <td className="lwd-td">{getStatusBadge(r.status)}</td>

                      <td className="lwd-td flex gap-2 flex-wrap">
                        {r.status === "PENDING" && (
                          <button
                            onClick={() => openConfirm(r, "APPROVE")}
                            className="lwd-btn-primary-sm"
                          >
                            Approve
                          </button>
                        )}

                        {r.status === "ACTIVE" && (
                          <button
                            onClick={() => openConfirm(r, "BLOCK")}
                            className="lwd-btn-secondary"
                          >
                            Block
                          </button>
                        )}

                        {r.status === "SUSPENDED" && (
                          <button
                            onClick={() => openConfirm(r, "UNBLOCK")}
                            className="lwd-btn-secondary"
                          >
                            Unblock
                          </button>
                        )}

                        <button className="lwd-btn-primary-sm flex items-center gap-1">
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
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

      {/* MODAL */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="lwd-card w-full max-w-md">

            <h3 className="lwd-title mb-4">
              Confirm {confirm.action?.toLowerCase()}
            </h3>

            <p className="lwd-text mb-6">
              Are you sure you want to{" "}
              <strong>{confirm.action?.toLowerCase()}</strong>{" "}
              {confirm.recruiter?.name}?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="lwd-btn-outline"
              >
                Cancel
              </button>

              <button
                onClick={handleAction}
                className="lwd-btn-primary"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}