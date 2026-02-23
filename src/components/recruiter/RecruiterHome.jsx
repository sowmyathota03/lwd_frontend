import { Briefcase, FileText, Users, Clock, Calendar, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchRecruiterDashboard } from "../../api/DashboardApi";

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  // Prepare stats from real data
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
      {/* 🔥 Welcome Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
        <p className="text-blue-100">
          Here's what's happening with your recruitment activity today.
        </p>
      </div>

      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-between hover:shadow-2xl transition duration-300"
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {item.value}
              </h3>
            </div>
            <div className={`${item.color} text-white p-4 rounded-xl shadow-md`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 📈 Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Applications
          </h4>
          {dashboardData.recentApplications?.length > 0 ? (
            <ul className="space-y-4">
              {dashboardData.recentApplications.map((app, idx) => (
                <li key={idx} className="border-b pb-2 last:border-0">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {app.candidateName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {app.jobTitle} • {app.appliedDate} •{" "}
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {app.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent applications</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h4>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => (window.location.href = "/jobs/new")}
              className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              + Post New Job
            </button>
            <button
              onClick={() => (window.location.href = "/applications")}
              className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              View Applications
            </button>
            <button
              onClick={() => (window.location.href = "/jobs/manage")}
              className="bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Manage Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Optional: Job Stats Per Job */}
      {dashboardData.perJobStats?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Job-wise Statistics
          </h4>
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
                {dashboardData.perJobStats.map((job, idx) => (
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
        </div>
      )}
    </div>
  );
}