import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getAllRecruiters,
  getPendingRecruiters,
  approveRecruiter,
  blockRecruiter,
} from "../../api/RecruiterAdminApi";
import ConfirmDialog from "./ConfirmDialog";
import Loader from "../common/Loader";

export default function RecruiterList() {
  const [allRecruiters, setAllRecruiters] = useState([]);
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [confirm, setConfirm] = useState({
    open: false,
    action: null,
    recruiter: null,
  });

  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    activeTab === "ALL" ? fetchAllRecruiters() : fetchPendingRecruiters();
  }, [activeTab, page]);

  const fetchAllRecruiters = async () => {
    try {
      setLoading(true);
      const data = await getAllRecruiters(page, size);
      setAllRecruiters(data.content);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load recruiters");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRecruiters = async () => {
    try {
      setLoading(true);
      const data = await getPendingRecruiters(page, size);
      setPendingRecruiters(data.content);
      setTotalPages(data.totalPages);
    } catch {
      setError("Failed to load pending recruiters");
    } finally {
      setLoading(false);
    }
  };

  const openConfirm = (action, recruiter) => {
    setConfirm({ open: true, action, recruiter });
  };

  const handleConfirm = async () => {
    const { action, recruiter } = confirm;

    try {
      setActionLoading(true);

      if (action === "approve") await approveRecruiter(recruiter.id);
      if (action === "block") await blockRecruiter(recruiter.id, true);
      if (action === "unblock") await blockRecruiter(recruiter.id, false);

      fetchAllRecruiters();
      fetchPendingRecruiters();
    } catch {
      setError("Action failed");
    } finally {
      setActionLoading(false);
      setConfirm({ open: false, action: null, recruiter: null });
    }
  };

  const recruiters =
    activeTab === "PENDING" ? pendingRecruiters : allRecruiters;

  if (loading) {
    return (
      <div className="lwd-page flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="lwd-page space-y-6">

      {/* Header */}
      <div className="lwd-card">
        <h2 className="lwd-title">Recruiters</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        {["ALL", "PENDING"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(0);
            }}
            className={`lwd-tab ${activeTab === tab ? "lwd-tab-active" : ""
              }`}
          >
            {tab === "ALL" ? "All Recruiters" : "Pending Approval"}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && <div className="lwd-card text-red-600">{error}</div>}

      {/* Table */}
      <div className="lwd-card overflow-x-auto">
        <table className="lwd-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {recruiters.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 lwd-text">
                  No recruiters found
                </td>
              </tr>
            ) : (
              recruiters.map((rec) => (
                <tr key={rec.id}>
                  <td>
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="lwd-link"
                    >
                      {rec.name}
                    </NavLink>
                  </td>

                  <td>
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="lwd-link"
                    >
                      {rec.email}
                    </NavLink>
                  </td>

                  <td>{rec.role}</td>

                  <td>
                    <span
                      className={`lwd-badge ${rec.status === "ACTIVE"
                          ? "lwd-badge-success"
                          : rec.status === "PENDING_APPROVAL"
                            ? "lwd-badge-warning"
                            : "lwd-badge-danger"
                        }`}
                    >
                      {rec.status}
                    </span>
                  </td>

                  <td>
                    {rec.createdAt
                      ? new Date(rec.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="flex gap-2 flex-wrap">
                    {rec.status === "PENDING_APPROVAL" && (
                      <button
                        onClick={() => openConfirm("approve", rec)}
                        className="lwd-btn-success-sm"
                      >
                        Approve
                      </button>
                    )}

                    {rec.status !== "SUSPENDED" ? (
                      <button
                        onClick={() => openConfirm("block", rec)}
                        className="lwd-btn-danger-sm"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => openConfirm("unblock", rec)}
                        className="lwd-btn-primary-sm"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="lwd-btn-secondary-sm"
        >
          Prev
        </button>

        <span className="lwd-text">
          Page {page + 1} / {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="lwd-btn-secondary-sm"
        >
          Next
        </button>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirm.open}
        title={`${confirm.action?.toUpperCase()} Recruiter`}
        message={`Are you sure you want to ${confirm.action} ${confirm.recruiter?.name}?`}
        confirmText={confirm.action}
        onConfirm={handleConfirm}
        onCancel={() =>
          setConfirm({ open: false, action: null, recruiter: null })
        }
        loading={actionLoading}
      />
    </div>
  );
}