import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  getAllRecruiters,
  getPendingRecruiters,
  approveRecruiter,
  blockRecruiter,
} from "../../api/RecruiterAdminApi";
import ConfirmDialog from "./ConfirmDialog";

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
    if (activeTab === "ALL") {
      fetchAllRecruiters();
    } else {
      fetchPendingRecruiters();
    }
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

      if (action === "approve") {
        await approveRecruiter(recruiter.id);
        fetchAllRecruiters();
        fetchPendingRecruiters();
      }

      if (action === "block") {
        await blockRecruiter(recruiter.id, true);
        fetchAllRecruiters();
      }

      if (action === "unblock") {
        await blockRecruiter(recruiter.id, false);
        fetchAllRecruiters();
      }
    } catch {
      alert("Action failed");
    } finally {
      setActionLoading(false);
      setConfirm({ open: false, action: null, recruiter: null });
    }
  };

  const recruiters =
    activeTab === "PENDING" ? pendingRecruiters : allRecruiters;

  if (loading) {
    return (
      <p className="text-blue-600 font-medium">
        Loading recruiters...
      </p>
    );
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">
        Recruiters
      </h2>

      {/* ===== Tabs ===== */}
      <div className="flex gap-3 mb-5">
        <button
          onClick={() => {
            setActiveTab("ALL");
            setPage(0);
          }}
          className={`px-5 py-2 rounded font-medium transition-all ${
            activeTab === "ALL"
              ? "bg-linear-to-r from-blue-400 to-blue-600 text-white shadow-md"
              : "bg-blue-100 text-blue-900 hover:bg-blue-200"
          }`}
        >
          All Recruiters
        </button>

        <button
          onClick={() => {
            setActiveTab("PENDING");
            setPage(0);
          }}
          className={`px-5 py-2 rounded font-medium transition-all ${
            activeTab === "PENDING"
              ? "bg-linear-to-r from-blue-400 to-blue-600 text-white shadow-md"
              : "bg-blue-100 text-blue-900 hover:bg-blue-200"
          }`}
        >
          Pending Approval
        </button>
      </div>

      {error && (
        <p className="text-red-600 mb-3">{error}</p>
      )}

      {/* ===== Table ===== */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Role</th>
              <th className="p-4 text-left font-semibold">Status</th>
              <th className="p-4 text-left font-semibold">Created At</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recruiters.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No recruiters found
                </td>
              </tr>
            ) : (
              recruiters.map((rec) => (
                <tr
                  key={rec.id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-4">
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="text-blue-600 hover:underline"
                    >
                      {rec.name}
                    </NavLink>
                  </td>

                  <td className="p-4">
                    <NavLink
                      to={`/recruiters-admin/recruiter/${rec.id}/jobs`}
                      className="text-blue-600 hover:underline"
                    >
                      {rec.email}
                    </NavLink>
                  </td>

                  <td className="p-4">{rec.role}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        rec.status === "PENDING_APPROVAL"
                          ? "bg-yellow-100 text-yellow-700"
                          : rec.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {rec.createdAt
                      ? new Date(rec.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4 flex gap-2 flex-wrap">
                    {rec.status === "PENDING_APPROVAL" && (
                      <button
                        onClick={() => openConfirm("approve", rec)}
                        className="px-4 py-1 rounded text-sm text-white bg-linear-to-r from-green-500 to-green-700 hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                    )}

                    {rec.status !== "BLOCKED" ? (
                      <button
                        onClick={() => openConfirm("block", rec)}
                        className="px-4 py-1 rounded text-sm text-white bg-linear-to-r from-red-500 to-red-700 hover:opacity-90 transition"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => openConfirm("unblock", rec)}
                        className="px-4 py-1 rounded-full text-sm text-white bg-linear-to-r from-blue-500 to-blue-700 hover:opacity-90 transition"
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

      {/* ===== Pagination ===== */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-2 py-1 rounded border-2 text-gray-600 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-2 py-1 rounded border-2 text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
