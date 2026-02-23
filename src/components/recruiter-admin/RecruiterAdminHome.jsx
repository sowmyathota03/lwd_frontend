import {
  Briefcase,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  UserCog,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecruiterAdminDashboard } from "../../api/dashboardApi";
import Loader from "../common/Loader";
export default function RecruiterAdminHome() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecruiterAdminDashboard()
      .then((res) => setDashboardData(res.data))
      .catch((err) => {
        console.error("Failed to fetch recruiter admin dashboard", err);
        setError("Unable to load dashboard data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
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

  // Prepare KPIs from real data
  const kpis = [
    {
      title: "Total Recruiters",
      value: dashboardData.totalRecruitersInCompany,
      icon: <Users size={28} />,
      color: "bg-blue-500",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
      path: "/recruiter-admin/manage-recruiter",
    },
    {
      title: "Total Jobs Posted",
      value: dashboardData.totalJobsPosted,
      icon: <Briefcase size={28} />,
      color: "bg-green-500",
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
      path: "/recruiter-admin/managejob",
    },
    {
      title: "Active Jobs",
      value: dashboardData.activeJobs,
      icon: <CheckCircle size={28} />,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-100",
      borderColor: "border-indigo-500",
      path: "/recruiter-admin/managejob",
    },
    {
      title: "Closed Jobs",
      value: dashboardData.closedJobs,
      icon: <XCircle size={28} />,
      color: "bg-gray-500",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-500",
      path: "/recruiter-admin/managejob",
    },
    {
      title: "Total Applications",
      value: dashboardData.totalApplications,
      icon: <FileText size={28} />,
      color: "bg-purple-500",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-500",
      path: "/recruiter-admin/applications",
    },
  ];

  // Hiring funnel data
  const funnel = dashboardData.hiringFunnel || {};

  return (
    <div className="space-y-8 bg-gray-50 p-6 rounded-2xl">
      {/* 🔥 Welcome Section - Light professional gradient */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-gray-200 text-gray-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold mb-2">Company Dashboard 👔</h2>
        <p className="text-gray-600">
          Monitor your company's recruitment performance at a glance.
        </p>
      </div>

      {/* 📊 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpis.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className={`${item.bgColor} border-2 ${item.borderColor} rounded-2xl shadow-sm p-6 
                  flex items-center justify-between 
                  hover:shadow-md hover:-translate-y-1
                  transition duration-300 
                  ${item.path ? "cursor-pointer" : ""}`}
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">
                {item.value ?? 0}
              </h3>
            </div>

            <div className={`${item.color} p-4 rounded-xl`}>{item.icon}</div>
          </div>
        ))}
      </div>

      {/* 👥 Recruiter Performance Table */}
      {dashboardData.recruiterPerformance?.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-gray-600" /> Recruiter Performance
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recruiter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jobs Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Jobs
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recruiterPerformance.map((rec, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rec.recruiterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rec.jobsPosted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rec.applicationsReceived}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rec.activeJobs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Two‑column layout: Recent Jobs + Hiring Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" /> Recent Jobs
          </h4>
          {dashboardData.recentJobs?.length > 0 ? (
            <ul className="space-y-3">
              {dashboardData.recentJobs.map((job, idx) => (
                <li
                  key={idx}
                  className="border-b border-gray-100 pb-2 last:border-0"
                >
                  <p className="font-medium text-gray-800">{job.title}</p>
                  <p className="text-sm text-gray-600">
                    Posted: {job.posted} • Status:{" "}
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      {job.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent jobs</p>
          )}
        </div>

        {/* Hiring Funnel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" /> Hiring Funnel
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Applied</span>
                <span className="font-medium">{funnel.applied || 0}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(((funnel.applied || 0) / (funnel.applied || 1)) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Shortlisted</span>
                <span className="font-medium">{funnel.shortlisted || 0}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(((funnel.shortlisted || 0) / (funnel.applied || 1)) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Interview Scheduled</span>
                <span className="font-medium">{funnel.interview || 0}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(((funnel.interview || 0) / (funnel.applied || 1)) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Selected</span>
                <span className="font-medium">{funnel.selected || 0}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(((funnel.selected || 0) / (funnel.applied || 1)) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Rejected</span>
                <span className="font-medium">{funnel.rejected || 0}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
                <div
                  className="bg-red-600 h-2.5 rounded-full"
                  style={{
                    width: `${Math.min(((funnel.rejected || 0) / (funnel.applied || 1)) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h4>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => (window.location.href = "recruiter-admin/createjob")}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2 shadow-sm"
          >
            + Post New Job
          </button>
          <button
            onClick={() => (window.location.href = "/recruiter-admin/managejob")}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition flex items-center gap-2 shadow-sm"
          >
            <Users size={18} /> Manage Recruiters
          </button>
          <button
            onClick={() => (window.location.href = "/recruiter-admin/applications")}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition flex items-center gap-2 shadow-sm"
          >
            <FileText size={18} /> View All Applications
          </button>
        </div>
      </div>
    </div>
  );
}
