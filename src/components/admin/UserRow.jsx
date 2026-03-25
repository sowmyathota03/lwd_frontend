import React from "react";
import { Link } from "react-router-dom";

const UserRow = React.memo(({ user, isLoading, openConfirm }) => {

  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    APPROVED: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    PENDING_APPROVAL: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    BLOCKED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    SUSPENDED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <tr className="lwd-table-row hover:bg-gray-50 dark:hover:bg-slate-800 transition">

      {/* Name */}
      <td className="px-4 py-2 font-medium">
        <Link
          to={`/profile/${user.id}`}
          className="lwd-link"
        >
          {user.name}
        </Link>
      </td>

      {/* Email */}
      <td className="px-4 py-2">
        <Link
          to={`/profile/${user.id}`}
          className="lwd-text hover:underline"
        >
          {user.email}
        </Link>
      </td>

      {/* Role */}
      <td className="px-4 py-2 lwd-text">
        {user.role}
      </td>

      {/* Status */}
      <td className="px-4 py-2">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[user.status] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
        >
          {user.status}
        </span>
      </td>

      {/* Created At */}
      <td className="px-4 py-2 lwd-text text-sm">
        {new Date(user.createdAt).toLocaleDateString("en-GB")}
      </td>

      {/* Updated At */}
      <td className="px-4 py-2 lwd-text text-sm">
        {new Date(user.updatedAt).toLocaleDateString("en-GB")}
      </td>

      {/* Actions */}
      <td className="px-4 py-2 flex items-center gap-2">

        {/* Block / Unblock */}
        <button
          disabled={isLoading || user.status === "APPROVED"}
          onClick={() => openConfirm(user, "block")}
          className="lwd-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Processing..."
            : user.status === "BLOCKED" || user.status === "SUSPENDED"
              ? "Unblock"
              : "Block"}
        </button>

        {/* Approve */}
        {user.status === "PENDING_APPROVAL" && (
          <button
            disabled={isLoading}
            onClick={() => openConfirm(user, "approve")}
            className="lwd-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Approve"}
          </button>
        )}

      </td>
    </tr>
  );
});

export default UserRow;