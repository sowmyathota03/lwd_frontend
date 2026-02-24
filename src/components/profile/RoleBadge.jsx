const RoleBadge = ({ role }) => {
  if (!role) return null;

  const colors = {
    ADMIN: "bg-red-100 text-red-700",
    RECRUITER: "bg-green-100 text-green-700",
    JOB_SEEKER: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`px-4 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${colors[role]}`}
    >
      {role.replaceAll("_", " ")}
    </span>
  );
};

export default RoleBadge;
