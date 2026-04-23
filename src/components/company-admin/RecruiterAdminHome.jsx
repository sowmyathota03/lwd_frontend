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
import {
  fetchRecruiterAdminSummary,
  fetchRecruiterPerformance,
  fetchRecruiterAdminRecentJobs,
  fetchHiringFunnel,
} from "../../api/RecruiterAdminApi";
import Loader from "../common/Loader";

export default function RecruiterAdminHome() {
  const [summary, setSummary] = useState({});
  const [recruiterPerformance, setRecruiterPerformance] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [funnel, setFunnel] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const summaryRes = await fetchRecruiterAdminSummary();
        setSummary(summaryRes.data || {});

        const [perfRes, jobsRes, funnelRes] = await Promise.all([
          fetchRecruiterPerformance(),
          fetchRecruiterAdminRecentJobs(5),
          fetchHiringFunnel(),
        ]);

        setRecruiterPerformance(perfRes.data || []);
        setRecentJobs(jobsRes.data || []);
        setFunnel(funnelRes.data || {});
      } catch (err) {
        console.error("Failed to load Company Admin dashboard:", err);
        setError("Unable to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
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

  const kpis = [
    {
      title: "Total Recruiters",
      value: summary.totalRecruitersInCompany ?? 0,
      icon: <Users size={24} />,
      path: "/company-admin/manage-recruiter",
    },
    {
      title: "Total Jobs",
      value: summary.totalJobsPosted ?? 0,
      icon: <Briefcase size={24} />,
      path: "/company-admin/managejob",
    },
    {
      title: "Active Jobs",
      value: summary.activeJobs ?? 0,
      icon: <CheckCircle size={24} />,
      path: "/company-admin/managejob",
    },
    {
      title: "Closed Jobs",
      value: summary.closedJobs ?? 0,
      icon: <XCircle size={24} />,
      path: "/company-admin/managejob",
    },
    {
      title: "Applications",
      value: summary.totalApplications ?? 0,
      icon: <FileText size={24} />,
      path: "/company-admin/applications",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Company Dashboard 👔</h2>
          <p className="mt-1 text-blue-100">
            Monitor recruitment performance at a glance.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.title}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                    {item.value}
                  </h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                  {item.icon}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Recruiter Performance Table */}
        {recruiterPerformance?.length > 0 && (
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
              <UserCog className="h-5 w-5" /> Recruiter Performance
            </h4>

            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Recruiter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Jobs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Active
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {recruiterPerformance.map((rec, i) => (
                    <tr
                      key={i}
                      className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {rec.recruiterName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {rec.jobsPosted}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {rec.applicationsReceived}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {rec.activeJobs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Two-Column Layout */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Jobs */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
              <Briefcase className="h-5 w-5" /> Recent Jobs
            </h4>

            {recentJobs?.length ? (
              <ul className="space-y-3">
                {recentJobs.map((job, i) => (
                  <li
                    key={i}
                    className="border-b border-gray-200 pb-2 last:border-0 dark:border-gray-700"
                  >
                    <p className="font-medium text-gray-800 dark:text-white">
                      {job.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {job.posted} •{" "}
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {job.status}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-gray-500 dark:text-gray-400">
                No recent jobs
              </p>
            )}
          </div>

          {/* Hiring Funnel */}
          <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
              <TrendingUp className="h-5 w-5" /> Hiring Funnel
            </h4>

            <div className="mt-4 space-y-4">
              {["applied", "shortlisted", "interview", "selected", "rejected"].map(
                (key) => {
                  const value = funnel[key] || 0;
                  const percentage =
                    (funnel.applied || 0) > 0
                      ? Math.min((value / funnel.applied) * 100, 100)
                      : 0;

                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm">
                        <span className="capitalize text-gray-600 dark:text-gray-300">
                          {key}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {value}
                        </span>
                      </div>

                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white p-6 shadow-md dark:bg-gray-800">
          <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Quick Actions
          </h4>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/company-admin/createjob")}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              + Post Job
            </button>

            <button
              onClick={() => navigate("/company-admin/manage-recruiter")}
              className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Manage Recruiters
            </button>

            <button
              onClick={() => navigate("/company-admin/applications")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Applications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}