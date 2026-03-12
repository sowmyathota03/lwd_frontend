import { Briefcase, FileText, Calendar, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchRecruiterDashboard } from "../../api/DashboardApi";

// ─── Helper Sub‑Components ─────────────────────────────────────────────

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition duration-200 border border-gray-100">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
    <div className={`${color} text-white p-4 rounded-lg shadow-sm`}>{icon}</div>
  </div>
);

const RecentApplications = ({ applications }) => {
  if (!applications?.length) {
    return <p className="text-gray-500">No recent applications</p>;
  }

  return (
    <ul className="space-y-4">
      {applications.map((app, idx) => (
        <li key={idx} className="border-b border-gray-100 pb-3 last:border-0">
          <p className="font-medium text-gray-800">{app.candidateName}</p>
          <p className="text-sm text-gray-600">
            {app.jobTitle} • {app.appliedDate} •{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
              {app.status}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
};

const QuickActions = () => (
  <div className="flex flex-col gap-3">
    <button
      onClick={() => (window.location.href = "/jobs/new")}
      className="bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
    >
      + Post New Job
    </button>
    <button
      onClick={() => (window.location.href = "/applications")}
      className="bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
    >
      View Applications
    </button>
    <button
      onClick={() => (window.location.href = "/jobs/manage")}
      className="bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition font-medium shadow-sm"
    >
      Manage Jobs
    </button>
  </div>
);

const PerJobStatsTable = ({ stats }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Job Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Applications
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Shortlisted
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Rejected
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Pending
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {stats.map((job, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {job.jobTitle}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {job.applications}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {job.shortlisted}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {job.rejected}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {job.pending}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────

export default function RecruiterHome() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecruiterDashboard()
      .then((res) => setDashboardData(res.data))
      .catch((err) => {
        console.error("Failed to fetch recruiter dashboard", err);
        setError("Unable to load dashboard data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
        role="alert"
      >
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-blue-600 text-white rounded-xl p-8 shadow-md">
        <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
        <p className="text-blue-50">
          Here's what's happening with your recruitment activity today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Applications
          </h4>
          <RecentApplications applications={dashboardData.recentApplications} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h4>
          <QuickActions />
        </div>
      </div>

      {/* Optional: Per‑Job Statistics */}
      {dashboardData.perJobStats?.length > 0 && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Job‑wise Statistics
          </h4>
          <PerJobStatsTable stats={dashboardData.perJobStats} />
        </div>
      )}
    </div>
  );
}