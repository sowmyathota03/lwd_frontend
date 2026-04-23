function UserActionButtons({ user, loading, onAction }) {
  const isPending =
    user.status === "PENDING_APPROVAL" ||
    user.status === "COMPANY_PENDING_APPROVAL";

  const canReject =
    (user.role === "RECRUITER" || user.role === "COMPANY_ADMIN") && isPending;

  const isSuspended = user.status === "SUSPENDED";

  return (
    <div className="flex gap-2 flex-wrap justify-end">
      {isPending && (
        <button
          onClick={() => onAction(user, "approve")}
          disabled={loading}
          className="lwd-btn-success-sm disabled:opacity-50"
        >
          Approve
        </button>
      )}

      {canReject && (
        <button
          onClick={() => onAction(user, "reject")}
          disabled={loading}
          className="lwd-btn-danger-sm disabled:opacity-50"
        >
          Reject
        </button>
      )}

      {!isPending &&
        (isSuspended ? (
          <button
            onClick={() => onAction(user, "unblock")}
            disabled={loading}
            className="lwd-btn-primary-sm disabled:opacity-50"
          >
            Unblock
          </button>
        ) : (
          <button
            onClick={() => onAction(user, "block")}
            disabled={loading}
            className="lwd-btn-danger-sm disabled:opacity-50"
          >
            Block
          </button>
        ))}
    </div>
  );
}

export default UserActionButtons;