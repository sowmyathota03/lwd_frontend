import { Briefcase, FileText, Calendar, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchRecruiterDashboard } from "../../api/DashboardApi";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon, color }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </h3>
      </div>
      <div
        className={`${color} rounded-full p-3 text-white shadow-sm transition-transform duration-200 group-hover:scale-110`}
      >
        {icon}
      </div>
    </div>
    {/* Decorative gradient line */}
    <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </div>
);

/* ================= RECENT APPLICATIONS ================= */
const RecentApplications = ({ applications }) => {
  if (!applications?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
        <FileText size={40} className="mb-2 opacity-50" />
        <p className="text-sm">No recent applications</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {applications.map((app, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0 dark:border-gray-700"
        >
          <div>
            <p className="font-medium text-gray-800 dark:text-white">
              {app.candidateName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {app.jobTitle} • {app.appliedDate}
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ================= QUICK ACTIONS ================= */
const QuickActions = () => (
  <div className="flex flex-col gap-3">
    <button
      onClick={() => (window.location.href = "/recruiter/createjob")}
      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      + Post New Job
    </button>

    <button
      onClick={() => (window.location.href = "/recruiter/applications")}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
    >
      View Applications
    </button>

    <button
      onClick={() => (window.location.href = "/recruiter/managejob")}
      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    >
      Manage Jobs
    </button>
  </div>
);

/* ================= TABLE ================= */
const PerJobStatsTable = ({ stats }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Job Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Applications
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Shortlisted
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Rejected
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Pending
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
        {stats.map((job, idx) => (
          <tr key={idx} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
              {job.jobTitle}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              {job.applications}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              {job.shortlisted}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              {job.rejected}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
              {job.pending}
            </td>
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
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Jobs",
      value: dashboardData.myPostedJobs,
      icon: <Briefcase size={24} />,
      color: "bg-blue-500",
    },
    {
      title: "Active Jobs",
      value: dashboardData.myActiveJobs,
      icon: <Briefcase size={24} />,
      color: "bg-green-500",
    },
    {
      title: "Total Applications",
      value: dashboardData.totalApplications,
      icon: <FileText size={24} />,
      color: "bg-purple-500",
    },
    {
      title: "Interviews Scheduled",
      value: dashboardData.interviewsScheduled,
      icon: <Calendar size={24} />,
      color: "bg-yellow-500",
    },
    {
      title: "Shortlisted",
      value: dashboardData.shortlistedCandidates,
      icon: <UserCheck size={24} />,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
          <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
          <p className="mt-1 text-blue-100">
            Here's what's happening with your recruitment activity today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}
        </div>

        {/* Recent Applications & Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Applications */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Recent Applications
            </h4>
            <RecentApplications applications={dashboardData.recentApplications} />
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Quick Actions
            </h4>
            <QuickActions />
          </div>
        </div>

        {/* Job-wise Statistics */}
        {dashboardData.perJobStats?.length > 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Job-wise Statistics
            </h4>
            <PerJobStatsTable stats={dashboardData.perJobStats} />
          </div>
        )}
      </div>
    </div>
  );
}