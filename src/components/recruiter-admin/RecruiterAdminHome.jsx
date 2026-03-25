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
import { fetchRecruiterAdminDashboard } from "../../api/DashboardApi";
import Loader from "../common/Loader";

export default function RecruiterAdminHome() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecruiterAdminDashboard()
      .then((res) => setDashboardData(res.data))
      .catch(() =>
        setError("Unable to load dashboard data. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="lwd-page flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="lwd-card text-red-600">{error}</div>;
  }

  const kpis = [
    {
      title: "Total Recruiters",
      value: dashboardData.totalRecruitersInCompany,
      icon: <Users size={24} />,
      path: "/recruiter-admin/manage-recruiter",
    },
    {
      title: "Total Jobs",
      value: dashboardData.totalJobsPosted,
      icon: <Briefcase size={24} />,
      path: "/recruiter-admin/managejob",
    },
    {
      title: "Active Jobs",
      value: dashboardData.activeJobs,
      icon: <CheckCircle size={24} />,
      path: "/recruiter-admin/managejob",
    },
    {
      title: "Closed Jobs",
      value: dashboardData.closedJobs,
      icon: <XCircle size={24} />,
      path: "/recruiter-admin/managejob",
    },
    {
      title: "Applications",
      value: dashboardData.totalApplications,
      icon: <FileText size={24} />,
      path: "/recruiter-admin/applications",
    },
  ];

  const funnel = dashboardData.hiringFunnel || {};

  return (
    <div className="lwd-page space-y-6">

      {/* 🔥 Header */}
      <div className="lwd-card bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <h2 className="lwd-title text-2xl">Company Dashboard 👔</h2>
        <p className="lwd-text">
          Monitor recruitment performance at a glance.
        </p>
      </div>

      {/* 📊 KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="lwd-card lwd-card-hover cursor-pointer flex justify-between items-center"
          >
            <div>
              <p className="lwd-label">{item.title}</p>
              <h3 className="lwd-title text-xl">
                {item.value ?? 0}
              </h3>
            </div>
            <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* 👥 Recruiters */}
      {dashboardData.recruiterPerformance?.length > 0 && (
        <div className="lwd-card">
          <h4 className="lwd-title flex items-center gap-2">
            <UserCog className="w-5 h-5" /> Recruiter Performance
          </h4>

          <div className="overflow-x-auto mt-4">
            <table className="lwd-table">
              <thead>
                <tr>
                  <th>Recruiter</th>
                  <th>Jobs</th>
                  <th>Applications</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recruiterPerformance.map((rec, i) => (
                  <tr key={i}>
                    <td>{rec.recruiterName}</td>
                    <td>{rec.jobsPosted}</td>
                    <td>{rec.applicationsReceived}</td>
                    <td>{rec.activeJobs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 📦 Two Columns */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Recent Jobs */}
        <div className="lwd-card">
          <h4 className="lwd-title flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Recent Jobs
          </h4>

          {dashboardData.recentJobs?.length ? (
            <ul className="mt-4 space-y-3">
              {dashboardData.recentJobs.map((job, i) => (
                <li key={i} className="border-b pb-2 last:border-0">
                  <p className="lwd-text font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {job.posted} •{" "}
                    <span className="lwd-badge-success">
                      {job.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="lwd-text mt-3">No recent jobs</p>
          )}
        </div>

        {/* Funnel */}
        <div className="lwd-card">
          <h4 className="lwd-title flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> Hiring Funnel
          </h4>

          <div className="mt-4 space-y-4">
            {["applied", "shortlisted", "interview", "selected", "rejected"].map((key) => (
              <div key={key}>
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{key}</span>
                  <span className="font-medium">{funnel[key] || 0}</span>
                </div>

                <div className="lwd-progress">
                  <div
                    className="lwd-progress-bar"
                    style={{
                      width: `${Math.min(((funnel[key] || 0) / (funnel.applied || 1)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🚀 Actions */}
      <div className="lwd-card">
        <h4 className="lwd-title">Quick Actions</h4>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => navigate("/recruiter-admin/createjob")}
            className="lwd-btn-primary"
          >
            + Post Job
          </button>

          <button
            onClick={() => navigate("/recruiter-admin/managejob")}
            className="lwd-btn-success"
          >
            Manage Recruiters
          </button>

          <button
            onClick={() => navigate("/recruiter-admin/applications")}
            className="lwd-btn-secondary"
          >
            Applications
          </button>
        </div>
      </div>
    </div>
  );
}