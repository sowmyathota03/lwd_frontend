import { useEffect, useState } from "react";
import KPICard from "../dashboard/KPICard";
import RecentTable from "../dashboard/RecentTable";
import SkeletonLoader from "../dashboard/SkeletonLoader";
import { motion } from "framer-motion";

import {
  Users,
  Building2,
  Briefcase,
  FileText,
  UserCog,
  CheckCircle,
  TrendingUp,
  Activity,
  Zap,
  ArrowRight,
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

import {
  fetchAdminSummary,
  fetchAdminGrowth,
  fetchRecentUsers,
  fetchRecentJobs,
  fetchRecentApplications,
  fetchJobsPerIndustry,
  fetchApplicationsTrend,
  fetchUsersByRole,
  fetchSystemHealth,
} from "../../api/adminDashboardApi";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [growth, setGrowth] = useState({});
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  const [industryData, setIndustryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  const [systemHealth, setSystemHealth] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const summaryRes = await fetchAdminSummary();
        setSummary(summaryRes.data || {});

        const [
          growthRes,
          usersRes,
          jobsRes,
          appsRes,
          industryRes,
          trendRes,
          roleRes,
          healthRes,
        ] = await Promise.all([
          fetchAdminGrowth(),
          fetchRecentUsers(5),
          fetchRecentJobs(5),
          fetchRecentApplications(5),
          fetchJobsPerIndustry(),
          fetchApplicationsTrend(),
          fetchUsersByRole(),
          fetchSystemHealth(),
        ]);

        setGrowth(growthRes.data || {});
        setRecentUsers(usersRes.data || []);
        setRecentJobs(jobsRes.data || []);
        setRecentApplications(appsRes.data || []);

        setIndustryData(
          Object.entries(industryRes.data || {}).map(([name, value]) => ({
            name,
            value,
          })),
        );

        setTrendData(trendRes.data || []);

        setRoleData(
          Object.entries(roleRes.data || {}).map(([name, value]) => ({
            name: name.toUpperCase(),
            value,
          })),
        );

        setSystemHealth(healthRes.data || {});
      } catch (err) {
        console.error("Error loading admin dashboard:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="lwd-page p-6 flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lwd-card-glass p-12 text-center max-w-md border-red-500/20"
        >
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Activity size={32} />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tight">
            Dashboard Offline
          </h2>

          <p className="text-slate-500 dark:text-slate-400 font-medium mb-6">
            Error loading dashboard: {error.message}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="lwd-btn-primary px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest"
          >
            Reconnect System
          </button>
        </motion.div>
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Total Talent",
      value: summary.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-600",
      path: "/admin/users",
    },
    {
      title: "Companies",
      value: summary.totalCompanies ?? 0,
      icon: Building2,
      color: "text-emerald-600",
      path: "/admin/companies",
    },
    {
      title: "Total Jobs",
      value: summary.totalJobs ?? 0,
      icon: Briefcase,
      color: "text-indigo-600",
      path: "/admin/managejob",
    },
    {
      title: "Applications",
      value: summary.totalApplications ?? 0,
      icon: FileText,
      color: "text-amber-600",
      path: "/admin/applications",
    },
    {
      title: "Recruiters",
      value: summary.totalRecruiters ?? 0,
      icon: UserCog,
      color: "text-rose-600",
      path: "/admin/recruiters",
    },
    {
      title: "Active Roles",
      value: summary.activeJobs ?? 0,
      icon: CheckCircle,
      color: "text-sky-600",
      path: "/admin/managejob",
    },
  ];

  const userColumns = [
    { key: "name", label: "Talent" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "joined", label: "Joined" },
  ];

  const jobColumns = [
    { key: "title", label: "Job Title" },
    { key: "companyName", label: "Company" },
    { key: "location", label: "Location" },
    { key: "posted", label: "Posted" },
  ];

  const appColumns = [
    { key: "jobTitle", label: "Position" },
    { key: "candidateName", label: "Applicant" },
    { key: "status", label: "Status" },
    { key: "appliedDate", label: "Applied" },
  ];

  const growthMetrics = [
    {
      label: "Talent Growth",
      value: growth.usersThisMonth ?? 0,
      icon: TrendingUp,
      color: "border-blue-500",
    },
    {
      label: "Job Flow",
      value: growth.jobsThisMonth ?? 0,
      icon: Activity,
      color: "border-indigo-500",
    },
    {
      label: "Weekly Apps",
      value: growth.applicationsThisWeek ?? 0,
      icon: Zap,
      color: "border-emerald-500",
    },
    {
      label: "Market Expand",
      value: growth.newCompaniesThisMonth ?? 0,
      icon: TrendingUp,
      color: "border-rose-500",
    },
  ];

  const COLORS = [
    "#2563eb",
    "#059669",
    "#d97706",
    "#e11d48",
    "#4f46e5",
    "#0284c7",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="lwd-page min-h-screen py-12 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-12 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
              <Activity size={12} />
              System Live
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Control{" "}
              <span className="text-blue-600 italic underline decoration-blue-500/20 underline-offset-8">
                Center
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest tabular-nums">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpiCards.map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <KPICard
                title={card.title}
                value={card.value}
                icon={card.icon}
                color={card.color}
                navigateTo={card.path}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <TrendingUp size={14} /> Growth Metrics
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {growthMetrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`lwd-card-glass p-5 flex items-center justify-between border-l-4 ${metric.color} group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/50">
                      <metric.icon
                        size={20}
                        className="text-slate-400 group-hover:text-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                        +{Number(metric.value || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-slate-200 dark:text-slate-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Users size={14} /> Ecosystem Balance
            </h3>

            <div className="lwd-card-glass p-8 flex-1 flex flex-col justify-center">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={roleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {roleData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(8px)",
                      padding: "16px",
                    }}
                    itemStyle={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    content={(props) => {
                      const { payload = [] } = props;
                      return (
                        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 mt-8">
                          {payload.map((entry, index) => (
                            <div
                              key={`item-${index}`}
                              className="flex items-center gap-2"
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                                {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Briefcase size={14} /> Market Demand
            </h3>

            <div className="lwd-card-glass p-8">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={industryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="barGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                      <stop
                        offset="100%"
                        stopColor="#2563eb"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(0,0,0,0.05)"
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(0,0,0,0.03)",
                    }}
                    contentStyle={{
                      backgroundColor: "rgba(59,130,246,0.5)", // universal blue
                      borderRadius: "16px",
                      border: "none",
                      color: "#ffffff",
                      boxShadow: "0 10px 25px rgba(59,130,246,0.4)",
                      backdropFilter: "blur(6px)",
                      padding: "12px 14px",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <TrendingUp size={14} /> Engagement Pulse
            </h3>

            <div className="lwd-card-glass p-8">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(0,0,0,0.05)"
                  />

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderRadius: "16px",
                      color: "#111827",
                      border: "black",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(8px)",
                      padding: "16px",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#areaGradient)"
                    dot={{
                      fill: "#10b981",
                      r: 4,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Activity size={14} /> Real-time Activity
          </h3>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <motion.div variants={itemVariants}>
              <RecentTable
                title="Latest Talent"
                data={recentUsers}
                columns={userColumns}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <RecentTable
                title="Latest Roles"
                data={recentJobs}
                columns={jobColumns}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <RecentTable
                title="Latest Applications"
                data={recentApplications}
                columns={appColumns}
              />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <motion.div
            variants={itemVariants}
            className="lwd-card-glass p-6 group hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all border-amber-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500">
                Expiring Slots
              </p>
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600">
                <Activity size={14} />
              </div>
            </div>

            <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {systemHealth.jobsExpiringSoon ?? 0}
            </p>

            <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    100,
                    ((systemHealth.jobsExpiringSoon ?? 0) / 50) * 100,
                  )}%`,
                }}
                className="h-full bg-amber-500"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lwd-card-glass p-6 group hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-all border-rose-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-500">
                Zero Engagement
              </p>
              <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600">
                <AlertCircle size={14} />
              </div>
            </div>

            <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {systemHealth.jobsWithoutApplications ?? 0}
            </p>

            <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    100,
                    ((systemHealth.jobsWithoutApplications ?? 0) / 20) * 100,
                  )}%`,
                }}
                className="h-full bg-rose-500"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lwd-card-glass p-6 group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all border-blue-500/10"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-500">
                Active Partners
              </p>
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                <Building2 size={14} />
              </div>
            </div>

            <p className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
              {systemHealth.activeRecruiters ?? 0}
            </p>

            <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    100,
                    ((systemHealth.activeRecruiters ?? 0) / 100) * 100,
                  )}%`,
                }}
                className="h-full bg-blue-500"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const AlertCircle = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default AdminDashboard;
