import React from "react";
import { Link } from "react-router-dom";

const UserRow = React.memo(({ user, isLoading, openConfirm }) => {
  
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700",
    APPROVED: "bg-green-100 text-green-700",
    PENDING_APPROVAL: "bg-yellow-100 text-yellow-700",
    BLOCKED: "bg-red-100 text-red-700",
    SUSPENDED: "bg-red-100 text-red-700",
  };

  return (
    <tr className="hover:bg-blue-50 transition">
      {/* Name */}
      <td className="px-4 py-2 font-medium">
        <Link
          to={`/profile/${user.id}`}
          className="text-gray-800 hover:text-teal-700 hover:underline transition"
        >
          {user.name}
        </Link>
      </td>

      {/* Email */}
      <td className="px-4 py-2">
        <Link
          to={`/profile/${user.id}`}
          className="text-gray-600 hover:text-teal-700 hover:underline transition"
        >
          {user.email}
        </Link>
      </td>

      {/* Role */}
      <td className="px-4 py-2 text-gray-700">
        {user.role}
      </td>

      {/* Status */}
      <td className="px-4 py-2">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            statusStyles[user.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {user.status}
        </span>
      </td>

      {/* Created At */}
      <td className="px-4 py-2 text-gray-600 text-sm">
        {new Date(user.createdAt).toLocaleDateString("en-GB")}
      </td>

      {/* Updated At */}
      <td className="px-4 py-2 text-gray-600 text-sm">
        {new Date(user.updatedAt).toLocaleDateString("en-GB")}
      </td>

      {/* Actions */}
      <td className="px-4 py-2 flex items-center gap-2">
        

        {/* Block / Unblock Button */}
        <button
          disabled={isLoading || user.status === "APPROVED"}
          onClick={() => openConfirm(user, "block")}
          className="px-3 py-1.5 text-sm font-medium rounded bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Processing..."
            : user.status === "BLOCKED" || user.status === "SUSPENDED"
            ? "Unblock"
            : "Block"}
        </button>

        {/* Approve Button */}
        {user.status === "PENDING_APPROVAL" && (
          <button
            disabled={isLoading}
            onClick={() => openConfirm(user, "approve")}
            className="px-3 py-1.5 text-sm font-medium rounded bg-teal-600 text-white hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Approve"}
          </button>
        )}
      </td>
    </tr>
  );
});

export default UserRow;
