import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function RecruiterAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: "/recruiter-admin", label: "Dashboard", icon: "📊" },
    { to: "/recruiter-admin/company-profile", label: "Company Profile", icon: "🏢" },
    { to: "/recruiter-admin/manage-recruiter", label: "Manage Recruiter", icon: "👥" },
    { to: "/recruiter-admin/managejob", label: "Manage Jobs", icon: "📄" },
    { to: "/recruiter-admin/createjob", label: "Create Job", icon: "➕" },
    { to: "/recruiter-admin/applications", label: "Applications", icon: "📑" },
    { to: "/recruiter-admin/job-seekers", label: "Job Seekers", icon: "📑" },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900 lwd-dashboard-bg">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-30 h-full
          ${sidebarOpen ? "w-64" : "w-16"}
          md:relative md:w-64
          transform transition-all duration-300 ease-in-out
          bg-white dark:bg-gray-800 shadow-xl
          lwd-dashboard-sidebar flex flex-col
        `}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700 lwd-dashboard-sidebar-header">
          <h2
            className={`
              text-xl font-bold tracking-wide text-gray-800 dark:text-white
              ${sidebarOpen ? "block" : "hidden"}
              md:block
              lwd-dashboard-sidebar-title
            `}
          >
            Recruiter Admin
          </h2>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden lwd-dashboard-toggle"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/recruiter-admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 lwd-dashboard-nav-active"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 lwd-dashboard-nav-item"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span
                className={`
                  ${sidebarOpen ? "block" : "hidden"}
                  md:block
                `}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900 lwd-dashboard-main">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}