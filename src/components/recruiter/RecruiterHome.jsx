import { Briefcase, FileText, Calendar, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchRecruiterDashboard } from "../../api/DashboardApi";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon, color }) => (
  <div className="lwd-card lwd-card-hover flex items-center justify-between">
    <div>
      <p className="lwd-text">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-2">
        {value}
      </h3>
    </div>
    <div className={`${color} text-white p-4 rounded-lg shadow-sm`}>
      {icon}
    </div>
  </div>
);

/* ================= RECENT APPLICATIONS ================= */
const RecentApplications = ({ applications }) => {
  if (!applications?.length) {
    return <p className="lwd-text">No recent applications</p>;
  }

  return (
    <ul className="space-y-4">
      {applications.map((app, idx) => (
        <li
          key={idx}
          className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0"
        >
          <p className="font-medium text-slate-800 dark:text-white">
            {app.candidateName}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {app.jobTitle} • {app.appliedDate} •{" "}
            <span className="lwd-badge">{app.status}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

/* ================= QUICK ACTIONS ================= */
const QuickActions = () => (
  <div className="flex flex-col gap-3">
    <button
      onClick={() => (window.location.href = "/recruiter/createjob")}
      className="lwd-btn-primary"
    >
      + Post New Job
    </button>

    <button
      onClick={() => (window.location.href = "/recruiter/applications")}
      className="lwd-btn-secondary"
    >
      View Applications
    </button>

    <button
      onClick={() => (window.location.href = "/recruiter/managejob")}
      className="lwd-btn-primary"
    >
      Manage Jobs
    </button>
  </div>
);

/* ================= TABLE ================= */
const PerJobStatsTable = ({ stats }) => (
  <div className="overflow-x-auto">
    <table className="lwd-table">
      <thead className="lwd-table-header">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
            Job Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
            Applications
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
            Shortlisted
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
            Rejected
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">
            Pending
          </th>
        </tr>
      </thead>

      <tbody>
        {stats.map((job, idx) => (
          <tr key={idx} className="lwd-table-row">
            <td className="px-6 py-4 text-sm font-medium">
              {job.jobTitle}
            </td>
            <td className="px-6 py-4 text-sm">{job.applications}</td>
            <td className="px-6 py-4 text-sm">{job.shortlisted}</td>
            <td className="px-6 py-4 text-sm">{job.rejected}</td>
            <td className="px-6 py-4 text-sm">{job.pending}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ================= MAIN ================= */
export default function RecruiterHome() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecruiterDashboard()
      .then((res) => setDashboardData(res.data))
      .catch((err) => {
        console.error(err);
        setError("Unable to load dashboard data.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="lwd-loader animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="lwd-card border-red-300 text-red-600">
        {error}
      </div>
    );
  }

  const stats = [
    {
      title: "Total Jobs",
      value: dashboardData.myPostedJobs,
      icon: <Briefcase size={28} />,
      color: "bg-blue-500",
    },
    {
      title: "Active Jobs",
      value: dashboardData.myActiveJobs,
      icon: <Briefcase size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Total Applications",
      value: dashboardData.totalApplications,
      icon: <FileText size={28} />,
      color: "bg-purple-500",
    },
    {
      title: "Interviews Scheduled",
      value: dashboardData.interviewsScheduled,
      icon: <Calendar size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Shortlisted",
      value: dashboardData.shortlistedCandidates,
      icon: <UserCheck size={28} />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="lwd-page space-y-8 p-6">

      {/* HEADER */}
      <div className="lwd-card bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
        <p className="text-blue-100">
          Here's what's happening with your recruitment activity today.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="lwd-card">
          <h4 className="lwd-title mb-4">Recent Applications</h4>
          <RecentApplications applications={dashboardData.recentApplications} />
        </div>

        <div className="lwd-card">
          <h4 className="lwd-title mb-4">Quick Actions</h4>
          <QuickActions />
        </div>

      </div>

      {/* TABLE */}
      {dashboardData.perJobStats?.length > 0 && (
        <div className="lwd-card">
          <h4 className="lwd-title mb-4">Job-wise Statistics</h4>
          <PerJobStatsTable stats={dashboardData.perJobStats} />
        </div>
      )}
    </div>
  );
}