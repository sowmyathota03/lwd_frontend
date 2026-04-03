import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  PlusCircle,
  FileText,
  Users,
  Menu,
  X
} from "lucide-react";

export default function RecruiterDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/recruiter", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/recruiter/company-profile", label: "Company Profile", icon: <Building2 size={18} /> },
    { to: "/recruiter/managejob", label: "Jobs", icon: <Briefcase size={18} /> },
    { to: "/recruiter/createjob", label: "Post a Job", icon: <PlusCircle size={18} /> },
    { to: "/recruiter/applications", label: "Applications", icon: <FileText size={18} /> },
    { to: "/recruiter/job-seekers", label: "Job Seekers", icon: <Users size={18} /> },
  ];

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <div className="lwd-page flex h-screen w-screen overflow-hidden">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-30
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-64 transition-transform duration-300
          bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          flex flex-col shadow-sm
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              LWD
            </div>
            <span className="text-base font-bold text-slate-800 dark:text-white">Recruiter</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/recruiter"}
              onClick={() => setSidebarOpen(false)}
              className={navItemClass}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div className="px-3 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-0.5">LWD Recruiter</p>
            <p className="text-xs font-medium text-blue-600/70 dark:text-blue-400/70">Recruiter Portal</p>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* Mobile Top Bar */}
        <div className="md:hidden h-14 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Recruiter Portal</span>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}