import { useEffect, useState } from "react";
import {
  getAllUsers,
  blockUser,
  unblockUser,
  approveRecruiter,
} from "../../api/AdminApi";
import UserTable from "./UserTable";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [confirmUser, setConfirmUser] = useState(null);
  const [confirmType, setConfirmType] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const loadUsers = async (pageNumber = page) => {
    try {
      setLoading(true);
      const data = await getAllUsers(pageNumber, size);

      setUsers(data.content);
      setTotalPages(data.totalPages);
      setPage(data.pageNumber);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleNext = () => {
    if (page < totalPages - 1) loadUsers(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) loadUsers(page - 1);
  };

  const openConfirm = (user, type) => {
    setConfirmUser(user);
    setConfirmType(type);
  };

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmUser(null);
    setConfirmType(null);
  };

  const handleBlockUnblock = async (user) => {
    try {
      setActionLoadingId(user.id);

      if (user.status === "SUSPENDED") {
        await unblockUser(user.id);
        updateUserStatus(user.id, "ACTIVE");
      } else {
        await blockUser(user.id);
        updateUserStatus(user.id, "SUSPENDED");
      }
    } catch {
      alert("Failed to update user status");
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  const handleApprove = async (user) => {
    try {
      setActionLoadingId(user.id);
      await approveRecruiter(user.id);
      updateUserStatus(user.id, "ACTIVE");
    } catch {
      alert("Failed to approve user");
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
  };

  const updateUserStatus = (userId, status) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );
  };

  const confirmAction = () => {
    if (!confirmUser || !confirmType) return;

    if (confirmType === "block") {
      handleBlockUnblock(confirmUser);
    } else {
      handleApprove(confirmUser);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <h1 className="text-2xl font-semibold text-blue-900 text-center mb-10">
        User Management
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <UserTable
          users={users}
          loading={loading}
          actionLoadingId={actionLoadingId}
          openConfirm={openConfirm}
        />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-700">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Confirm Modal */}
      {confirmUser && confirmType && (
        <div
          onClick={closeConfirm}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-95 max-w-[92%] p-6 rounded-2xl shadow-2xl animate-scaleIn"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              {confirmType === "block"
                ? confirmUser.status === "SUSPENDED"
                  ? "Unblock User?"
                  : "Block User?"
                : "Approve User?"}
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to{" "}
              <strong>
                {confirmType === "block"
                  ? confirmUser.status === "SUSPENDED"
                    ? "unblock"
                    : "block"
                  : "approve"}
              </strong>{" "}
              <br />
              <span className="font-semibold text-gray-900">
                {confirmUser.name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                disabled={actionLoadingId}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmAction}
                disabled={actionLoadingId}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoadingId
                  ? "Please wait..."
                  : confirmType === "block"
                  ? confirmUser.status === "SUSPENDED"
                    ? "Yes, Unblock"
                    : "Yes, Block"
                  : "Yes, Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
