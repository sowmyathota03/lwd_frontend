import { useEffect, useMemo, useState } from "react";
import {
  searchUsers,
  blockUser,
  unblockUser,
  approveRecruiter,
} from "../../api/AdminApi";
import UserTable from "./UserTable";
import ConfirmModal from "../common/ConfirmModal";

const roleOptions = ["ADMIN", "RECRUITER_ADMIN", "RECRUITER", "JOB_SEEKER"];
const statusOptions = ["PENDING", "ACTIVE", "SUSPENDED", "BLOCKED"];

const formatLabel = (value) =>
  value
    ?.toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [isActive, setIsActive] = useState("");
  const [emailVerified, setEmailVerified] = useState("");
  const [locked, setLocked] = useState("");

  const [confirmConfig, setConfirmConfig] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    setPage(0);
  }, [debouncedKeyword, role, status, isActive, emailVerified, locked]);

  const filters = useMemo(
    () => ({
      keyword: debouncedKeyword || null,
      role: role || null,
      status: status || null,
      isActive: isActive === "" ? null : isActive === "true",
      emailVerified: emailVerified === "" ? null : emailVerified === "true",
      locked: locked === "" ? null : locked === "true",
    }),
    [debouncedKeyword, role, status, isActive, emailVerified, locked]
  );

  const hasActiveFilters = !!(
    keyword.trim() ||
    role ||
    status ||
    isActive !== "" ||
    emailVerified !== "" ||
    locked !== ""
  );

  const loadUsers = async (pageNumber = page) => {
    try {
      setLoading(true);
      const data = await searchUsers(filters, pageNumber, size);

      setUsers(data.content || []);
      setTotalPages(data.totalPages || 0);
      setPage(data.pageNumber ?? data.page ?? pageNumber);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(page);
  }, [page, filters]);

  const handleNext = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const openConfirm = (user, type) => {
    setConfirmConfig({ user, type });
  };

  const closeConfirm = () => {
    if (actionLoadingId) return;
    setConfirmConfig(null);
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
      alert("Failed to approve user");
    } finally {
      setActionLoadingId(null);
      closeConfirm();
    }
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

  const clearFilters = () => {
    setKeyword("");
    setDebouncedKeyword("");
    setRole("");
    setStatus("");
    setIsActive("");
    setEmailVerified("");
    setLocked("");
    setPage(0);
  };

  return (
    <div className="lwd-page p-4 md:p-6 space-y-6">

      {/* Title */}
      <h1 className="lwd-page-title text-center">
        User Management
      </h1>

      {/* Filters */}
      <div className="lwd-card space-y-4">

        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <input
            type="text"
            placeholder="Search by name, email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="lwd-input lg:w-80"
          />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="lwd-btn-danger-sm"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
          <select value={role} onChange={(e) => setRole(e.target.value)} className="lwd-input">
            <option value="">All Roles</option>
            {roleOptions.map((item) => (
              <option key={item} value={item}>{formatLabel(item)}</option>
            ))}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} className="lwd-input">
            <option value="">All Status</option>
            {statusOptions.map((item) => (
              <option key={item} value={item}>{formatLabel(item)}</option>
            ))}
          </select>

          <select value={isActive} onChange={(e) => setIsActive(e.target.value)} className="lwd-input">
            <option value="">All Activity</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select value={emailVerified} onChange={(e) => setEmailVerified(e.target.value)} className="lwd-input">
            <option value="">Email Verification</option>
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </select>

          <select value={locked} onChange={(e) => setLocked(e.target.value)} className="lwd-input">
            <option value="">Lock Status</option>
            <option value="true">Locked</option>
            <option value="false">Unlocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="lwd-card overflow-x-auto">
        <UserTable
          users={users}
          loading={loading}
          actionLoadingId={actionLoadingId}
          openConfirm={openConfirm}
        />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="lwd-btn-secondary-sm"
        >
          Previous
        </button>

        <span className="lwd-text">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="lwd-btn-primary-sm"
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
        confirmText="Confirm"
        onConfirm={confirmAction}
        onCancel={closeConfirm}
        loading={!!actionLoadingId}
      />
    </div>
  );
}