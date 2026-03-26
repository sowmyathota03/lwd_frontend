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
    <div className="lwd-page p-4 md:p-6 space-y-6">

      {/* Header */}
      <div className="lwd-card">
        <h2 className="lwd-title text-xl">Recruiters</h2>
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
            className={`px-4 py-2 rounded-md text-sm font-medium transition
              ${activeTab === tab
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300"
              }`}
          >
            {tab === "ALL" ? "All Recruiters" : "Pending Approval"}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="lwd-card text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="lwd-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700 text-left">
            <tr>
              <th className="py-2">Name</th>
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
                <tr
                  key={rec.id}
                  className="border-b border-gray-100 dark:border-gray-700"
                >
                  <td>
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {rec.name}
                    </NavLink>
                  </td>

                  <td>
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {rec.email}
                    </NavLink>
                  </td>

                  <td className="lwd-text">{rec.role}</td>

                  <td>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium
                        ${rec.status === "ACTIVE"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : rec.status === "PENDING_APPROVAL"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                        }`}
                    >
                      {rec.status}
                    </span>
                  </td>

                  <td className="lwd-text">
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