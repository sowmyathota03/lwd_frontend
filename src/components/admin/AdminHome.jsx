import { useDashboardData } from "../../hooks/useDashboardData";
import { fetchAdminDashboard } from "../../api/DashboardApi";
import KPICard from "../dashboard/KPICard";
import RecentTable from "../dashboard/RecentTable";
import SkeletonLoader from "../dashboard/SkeletonLoader";

import {
  Users,
  Building2,
  Briefcase,
  FileText,
  UserCog,
  CheckCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const { data, loading, error } = useDashboardData(fetchAdminDashboard);

  if (loading) return <SkeletonLoader />;

  if (error)
    return (
      <div className="lwd-page p-6">
        <div className="lwd-card rounded-lg bg-red-50 p-6 text-center text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <p className="lwd-text font-medium">
            Error loading dashboard: {error.message}
          </p>
        </div>
      </div>
    );

  const kpiCards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
      path: "/admin/users",
    },
    {
      title: "Total Companies",
      value: data.totalCompanies,
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
      path: "/admin/companies",
    },
    {
      title: "Total Jobs",
      value: data.totalJobs,
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-500",
      path: "/admin/managejob",
    },
    {
      title: "Total Applications",
      value: data.totalApplications,
      icon: FileText,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-500",
      path: "/admin/applications",
    },
    {
      title: "Total Recruiters",
      value: data.totalRecruiters,
      icon: UserCog,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      borderColor: "border-pink-500",
      path: "/admin/recruiters",
    },
    {
      title: "Active Jobs",
      value: data.activeJobs,
      icon: CheckCircle,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      borderColor: "border-indigo-500",
      path: "/admin/managejob",
    },
  ];

  const growthMetrics = [
    { label: "Users this month", value: data.usersThisMonth },
    { label: "Jobs this month", value: data.jobsThisMonth },
    { label: "Applications this week", value: data.applicationsThisWeek },
    { label: "New companies", value: data.newCompaniesThisMonth },
  ];

  const industryData = Object.entries(data.jobsPerIndustry || {}).map(
    ([name, value]) => ({ name, value })
  );

  const trendData = data.applicationsTrend || [];

  const roleData = Object.entries(data.usersByRole || {}).map(
    ([name, value]) => ({ name, value })
  );

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="lwd-page min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpiCards.map((card, index) => (
            <KPICard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              bgColor={card.bgColor}
              borderColor={card.borderColor}
              navigateTo={card.path}
            />
          ))}
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {growthMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="lwd-growth-card lwd-card group relative overflow-hidden rounded-2xl border-l-4 border-blue-500 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800"
            >
              <p className="lwd-text text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </p>
              <p className="lwd-title text-2xl font-bold text-gray-800 dark:text-white">
                {metric.value.toLocaleString()}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lwd-chart-card lwd-card rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <h3 className="lwd-title mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Jobs per Industry
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={industryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lwd-chart-card lwd-card rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <h3 className="lwd-title mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Applications (Last 7 days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="lwd-chart-card lwd-card rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
          <h3 className="lwd-title mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Users by Role
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {roleData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lwd-table-card lwd-card rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <RecentTable title="Recent Users" data={data.recentUsers || []} />
          </div>
          <div className="lwd-table-card lwd-card rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <RecentTable title="Recent Jobs" data={data.recentJobs || []} />
          </div>
          <div className="lwd-table-card lwd-card rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
            <RecentTable
              title="Recent Applications"
              data={data.recentApplications || []}
            />
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="lwd-health-card lwd-card group relative overflow-hidden rounded-2xl border border-yellow-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-yellow-800 dark:bg-gray-800">
            <p className="lwd-text text-sm text-gray-500 dark:text-gray-400">
              Jobs expiring soon
            </p>
            <p className="lwd-title text-2xl font-bold text-gray-800 dark:text-white">
              {data.jobsExpiringSoon}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yellow-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="lwd-health-card lwd-card group relative overflow-hidden rounded-2xl border border-red-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-red-800 dark:bg-gray-800">
            <p className="lwd-text text-sm text-gray-500 dark:text-gray-400">
              Jobs without applications
            </p>
            <p className="lwd-title text-2xl font-bold text-gray-800 dark:text-white">
              {data.jobsWithoutApplications}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-red-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          <div className="lwd-health-card lwd-card group relative overflow-hidden rounded-2xl border border-blue-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:border-blue-800 dark:bg-gray-800">
            <p className="lwd-text text-sm text-gray-500 dark:text-gray-400">
              Active Recruiters
            </p>
            <p className="lwd-title text-2xl font-bold text-gray-800 dark:text-white">
              {data.activeRecruiters}
            </p>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;