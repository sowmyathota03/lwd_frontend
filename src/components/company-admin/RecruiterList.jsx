import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getAllRecruiters,
  getPendingRecruiters,
  updateRecruiterStatus,
  rejectRecruiter,
} from "../../api/RecruiterAdminApi";
import { createUpdateUserStatusRequest } from "./UpdateUserStatusRequest";
import ConfirmDialog from "./ConfirmDialog";
import Loader from "../common/Loader";

export default function RecruiterList() {
  const [allRecruiters, setAllRecruiters] = useState([]);
  const [pendingRecruiters, setPendingRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
    if (activeTab === "ALL") {
      fetchAllRecruiters();
    } else {
      fetchPendingRecruiters();
    }
  }, [activeTab, page]);

  const fetchAllRecruiters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllRecruiters(page, size);
      setAllRecruiters(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Failed to load recruiters", err);
      setError("Failed to load recruiters");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRecruiters = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPendingRecruiters(page, size);
      setPendingRecruiters(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Failed to load pending recruiters", err);
      setError("Failed to load pending recruiters");
    } finally {
      setLoading(false);
    }
  };

  const refreshCurrentData = async () => {
    if (activeTab === "ALL") {
      await fetchAllRecruiters();
    } else {
      await fetchPendingRecruiters();
    }
  };

  const openConfirm = (action, recruiter) => {
    setConfirm({ open: true, action, recruiter });
  };

  const handleConfirm = async () => {
    const { action, recruiter } = confirm;

    if (!action || !recruiter) return;

    try {
      setActionLoading(true);
      setError("");
      setMessage("");

      if (action === "approve") {
        await updateRecruiterStatus(
          recruiter.id,
          createUpdateUserStatusRequest("ACTIVE")
        );
        setMessage("Recruiter approved successfully.");
      } else if (action === "reject") {
        await rejectRecruiter(recruiter.id);
        setMessage("Recruiter rejected successfully.");
      } else if (action === "block") {
        await updateRecruiterStatus(
          recruiter.id,
          createUpdateUserStatusRequest("SUSPENDED")
        );
        setMessage("Recruiter blocked successfully.");
      } else if (action === "unblock") {
        await updateRecruiterStatus(
          recruiter.id,
          createUpdateUserStatusRequest("ACTIVE")
        );
        setMessage("Recruiter unblocked successfully.");
      }

      await refreshCurrentData();

      if (activeTab === "ALL") {
        await fetchPendingRecruiters();
      } else {
        await fetchAllRecruiters();
      }
    } catch (err) {
      console.error("Action failed", err);
      setError("Action failed");
    } finally {
      setActionLoading(false);
      setConfirm({ open: false, action: null, recruiter: null });
    }
  };

  const recruiters =
    activeTab === "PENDING" ? pendingRecruiters : allRecruiters;

  const isPendingStatus = (status) =>
    status === "PENDING_APPROVAL" || status === "COMPANY_PENDING_APPROVAL";

  const getStatusClass = (status) => {
    if (status === "ACTIVE") {
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400";
    }

    if (
      status === "PENDING_APPROVAL" ||
      status === "COMPANY_PENDING_APPROVAL"
    ) {
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400";
    }

    if (status === "SUSPENDED") {
      return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400";
    }

    return "bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-300";
  };

  if (loading) {
    return (
      <div className="lwd-page flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="lwd-page p-4 md:p-6 space-y-6">
      <div className="lwd-card">
        <h2 className="lwd-title text-xl">Recruiters</h2>
      </div>

      <div className="flex gap-3">
        {["ALL", "PENDING"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(0);
              setError("");
              setMessage("");
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300"
            }`}
          >
            {tab === "ALL" ? "All Recruiters" : "Pending Approval"}
          </button>
        ))}
      </div>

      {message && (
        <div className="lwd-card text-green-600 dark:text-green-400">
          {message}
        </div>
      )}

      {error && (
        <div className="lwd-card text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="lwd-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 dark:border-gray-700 text-left">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Actions</th>
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
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  <td className="py-3 px-4">
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {rec.name}
                    </NavLink>
                  </td>

                  <td className="py-3 px-4">
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {rec.email}
                    </NavLink>
                  </td>

                  <td className="py-3 px-4 lwd-text">{rec.role}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusClass(
                        rec.status
                      )}`}
                    >
                      {rec.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 lwd-text">
                    {rec.createdAt
                      ? new Date(rec.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="py-3 px-4 flex gap-2 flex-wrap">
                    {isPendingStatus(rec.status) && (
                      <>
                        <button
                          onClick={() => openConfirm("approve", rec)}
                          className="lwd-btn-success-sm"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => openConfirm("reject", rec)}
                          className="lwd-btn-danger-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {!isPendingStatus(rec.status) &&
                      (rec.status !== "SUSPENDED" ? (
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
                      ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="lwd-btn-secondary-sm"
        >
          Prev
        </button>

        <span className="lwd-text">
          Page {page + 1} / {totalPages || 1}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="lwd-btn-secondary-sm"
        >
          Next
        </button>
      </div>

      <ConfirmDialog
        open={confirm.open}
        title={`${
          confirm.action
            ? confirm.action.charAt(0).toUpperCase() + confirm.action.slice(1)
            : ""
        } Recruiter`}
        message={`Are you sure you want to ${confirm.action} ${
          confirm.recruiter?.name || "this recruiter"
        }?`}
        confirmText={
          confirm.action
            ? confirm.action.charAt(0).toUpperCase() + confirm.action.slice(1)
            : "Confirm"
        }
        onConfirm={handleConfirm}
        onCancel={() =>
          setConfirm({ open: false, action: null, recruiter: null })
        }
        loading={actionLoading}
      />
    </div>
  );
}