import { useEffect, useState } from "react";
import { getCompanyAnalytics } from "../../api/CompanyApi";
import Loader from "../../components/common/Loader";
import { 
  Briefcase, 
  Users, 
  FileText, 
  PieChart as PieChartIcon, 
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  UserCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";

export default function CompanyAnalytics({ companyId }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, [companyId]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getCompanyAnalytics(companyId);
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics engine");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader message="Synthesizing Analytics..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="lwd-card-glass border-rose-500/20 bg-rose-500/5 p-12 text-center text-rose-500 font-bold uppercase tracking-widest italic animate-pulse">
        <XCircle className="mx-auto mb-4" size={32} />
        {error}
      </div>
    );
  }

  const chartData = [
    { name: "Active Jobs", value: analytics.activeJobs, color: "#10b981" }, // Emerald-500
    { name: "Closed Jobs", value: analytics.closedJobs, color: "#f43f5e" }, // Rose-500
  ].filter(d => d.value > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="lwd-page min-h-screen py-10 px-6 relative overflow-hidden">
      
      {/* Decorative Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl space-y-10 relative z-10"
      >
        
        {/* HEADING SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
              <TrendingUp size={12} />
              Performance Suite
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Operational <span className="text-blue-600 italic">Intelligence</span>
            </h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2 tabular-nums">
            <Activity size={14} className="text-blue-500" />
            Last Synced: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* PRIMARY METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div variants={itemVariants} className="lwd-card-glass p-8 space-y-4 group hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Volume</span>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Positions</h4>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                {analytics.totalJobs}
              </h3>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lwd-card-glass p-8 space-y-4 group hover:border-indigo-500/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Headcount</span>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Active Recruiters</h4>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                {analytics.totalRecruiters}
              </h3>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lwd-card-glass p-8 space-y-4 group hover:border-violet-500/30 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <FileText size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Interest</span>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Applications Ingress</h4>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter">
                {analytics.totalApplications}
              </h3>
            </div>
          </motion.div>

        </div>

        {/* DETAILED INSIGHTS: CHARTS & SUB-METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* DISTRIBUTION CHART */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lwd-card-glass p-8 space-y-6 min-h-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <PieChartIcon size={18} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">Status Distribution</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Ratio of Active to Closed Positions</p>
              </div>
            </div>

            <div className="h-70 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={200}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: 'none', 
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      padding: '12px'
                    }}
                    itemStyle={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="rect"
                    formatter={(value) => (
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* OPERATIONAL BREAKDOWN */}
          <motion.div variants={itemVariants} className="lwd-card-glass p-8 space-y-8 flex flex-col justify-center">
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-1 border-l-2 border-blue-500">
                Segmented Insights
              </h4>

              <div className="space-y-4">
                
                <div className="flex items-center justify-between p-4 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100/50 dark:border-emerald-800/20 group transition-all hover:bg-emerald-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">Active In-Market</span>
                  </div>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {analytics.activeJobs}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-rose-50/50 dark:bg-rose-900/10 rounded-2xl border border-rose-100/50 dark:border-rose-800/20 group transition-all hover:bg-rose-50">
                  <div className="flex items-center gap-3">
                    <XCircle className="text-rose-500" size={20} />
                    <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">Fulfilled / Archived</span>
                  </div>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400 tabular-nums">
                    {analytics.closedJobs}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-800/20 group transition-all hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <UserCheck className="text-blue-500" size={20} />
                    <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight">Engaged JobSeekers</span>
                  </div>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400 tabular-nums">
                    {analytics.totalJobSeekers || 0}
                  </span>
                </div>

              </div>
            </div>

            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center italic mt-auto">
              Strategic distribution metrics calculated based on real-time ingress data.
            </p>

          </motion.div>

        </div>

      </motion.div>
    </div>
  );
}
