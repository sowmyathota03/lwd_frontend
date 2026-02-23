// ./src/components/dashboard/AdminDashboard.jsx
import { useDashboardData } from "../../hooks/useDashboardData";
import { fetchAdminDashboard } from "../../api/DashboardApi";
import KPICard from "../common/KPICard";
import RecentTable from "../common/RecentTable";
import SkeletonLoader from "../common/SkeletonLoader";

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
      <div className="p-6 text-red-600">
        Error loading dashboard: {error.message}
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

  // Transform jobsPerIndustry map to array for bar chart
  const industryData = Object.entries(data.jobsPerIndustry || {}).map(
    ([name, value]) => ({ name, value }),
  );

  // Applications trend is already array of {day, count}
  const trendData = data.applicationsTrend || [];

  // Users by role map to pie data
  const roleData = Object.entries(data.usersByRole || {}).map(
    ([name, value]) => ({ name, value }),
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
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((card, index) => (
          <KPICard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            bgColor={card.bgColor}
            borderColor={card.borderColor}
            navigateTo={card.path} // ✅ correct prop
          />
        ))}
      </div>

      {/* Growth Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {growthMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
          >
            <p className="text-sm text-gray-500">{metric.label}</p>
            <p className="text-2xl font-bold">
              {metric.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Jobs per Industry */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Jobs per Industry</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Applications Trend */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">
            Applications (Last 7 days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Users by Role Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Users by Role</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {roleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTable
          title="Recent Users"
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "joined", label: "Joined" },
          ]}
          data={data.recentUsers || []}
        />
        <RecentTable
          title="Recent Jobs"
          columns={[
            { key: "title", label: "Title" },
            { key: "companyName", label: "Company" },
            { key: "location", label: "Location" },
            { key: "posted", label: "Posted" },
          ]}
          data={data.recentJobs || []}
        />
        <RecentTable
          title="Recent Applications"
          columns={[
            { key: "candidateName", label: "Candidate" },
            { key: "jobTitle", label: "Job" },
            { key: "appliedDate", label: "Applied" },
            { key: "status", label: "Status" },
          ]}
          data={data.recentApplications || []}
        />
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800 font-medium">
            Jobs expiring soon
          </p>
          <p className="text-2xl font-bold text-yellow-900">
            {data.jobsExpiringSoon}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-800 font-medium">
            Jobs without applications
          </p>
          <p className="text-2xl font-bold text-red-900">
            {data.jobsWithoutApplications}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-medium">Active Recruiters</p>
          <p className="text-2xl font-bold text-blue-900">
            {data.activeRecruiters}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
