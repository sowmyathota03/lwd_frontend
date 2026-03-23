import UserRow from "./UserRow";
import Loader from "../common/Loader";

export default function UserTable({
  users,
  loading,
  actionLoadingId,
  openConfirm,
  onApprove,
}) {
  if (loading) {
    return <Loader fullScreen={false} />;
  }

  return (
    <div className="overflow-x-auto">

      <table className="lwd-table text-sm text-left">

        {/* TABLE HEADER */}
        <thead className="lwd-table-header uppercase text-xs tracking-wide">
          <tr>
            <th className="px-4 py-2 font-semibold">Name</th>
            <th className="px-4 py-2 font-semibold">Email</th>
            <th className="px-4 py-2 font-semibold">Role</th>
            <th className="px-4 py-2 font-semibold">Status</th>
            <th className="px-4 py-2 font-semibold">Created At</th>
            <th className="px-4 py-2 font-semibold">Updated At</th>
            <th className="px-4 py-2 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {users.length === 0 ? (
            <tr className="lwd-table-row">
              <td
                colSpan="7"
                className="px-6 py-8 text-center lwd-text"
              >
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                isLoading={actionLoadingId === user.id}
                openConfirm={openConfirm}
                onApprove={onApprove}
              />
            ))
          )}
        </tbody>

      </table>

    </div>
  );
}