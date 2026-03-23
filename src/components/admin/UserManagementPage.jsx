import { useEffect, useState } from "react";
import {
  getAllUsers,
  blockUser,
  unblockUser,
  approveRecruiter,
} from "../../api/AdminApi";
import UserTable from "./UserTable";
import ConfirmModal from "../common/ConfirmModal";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [confirmConfig, setConfirmConfig] = useState(null);
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
    setConfirmConfig({ user, type });
  };

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmConfig(null);
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

  const confirmAction = async () => {
    if (!confirmConfig) return;

    const { user, type } = confirmConfig;

    if (type === "block") {
      await handleBlockUnblock(user);
    } else {
      await handleApprove(user);
    }
  };

  return (
    <div className="lwd-page min-h-screen p-6">

      {/* Heading */}
      <h1 className="lwd-title text-2xl text-center mb-8">
        User Management
      </h1>

      {/* Table */}
      <div className="lwd-card overflow-hidden">
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
          className="lwd-btn-secondary disabled:opacity-50"
        >
          Previous
        </button>

        <span className="lwd-text font-semibold">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="lwd-btn-primary disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmConfig}
        title={
          confirmConfig?.type === "block"
            ? confirmConfig.user.status === "SUSPENDED"
              ? "Unblock User?"
              : "Block User?"
            : "Approve User?"
        }
        message={
          confirmConfig
            ? `Are you sure you want to ${confirmConfig.type === "block"
              ? confirmConfig.user.status === "SUSPENDED"
                ? "unblock"
                : "block"
              : "approve"
            } ${confirmConfig.user.name}?`
            : ""
        }
        confirmText={
          confirmConfig?.type === "block"
            ? confirmConfig.user.status === "SUSPENDED"
              ? "Yes, Unblock"
              : "Yes, Block"
            : "Yes, Approve"
        }
        onConfirm={confirmAction}
        onCancel={closeConfirm}
        loading={!!actionLoadingId}
      />

    </div>
  );
}