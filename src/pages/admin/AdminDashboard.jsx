import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

// Navigation items extracted as a constant – won't be recreated on every render
const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/search", label: "Search", icon: "🔍" },
  { to: "/admin/companies", label: "Companies", icon: "🏢" },
  { to: "/admin/managejob", label: "Jobs", icon: "📄" },
  { to: "/admin/applications", label: "Applications", icon: "📑" },
  { to: "/admin/job-seekers", label: "Job Seekers", icon: "👤" },
  { to: "/admin/pricing", label: "Pricing", icon: "💰" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="lwd-admin-dashboard flex h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          lwd-sidebar fixed left-0 top-0 z-30 h-full
          ${sidebarOpen ? "w-64" : "w-16"}
          md:relative md:w-64
          transform transition-all duration-300 ease-in-out
          bg-white dark:bg-gray-800 shadow-xl
          flex flex-col
        `}
        aria-label="Admin navigation sidebar"
      >
        {/* Logo & toggle */}
        <div className="lwd-sidebar-header flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2
            className={`
              lwd-sidebar-title font-bold tracking-wide text-gray-800 dark:text-white
              ${sidebarOpen ? "block" : "hidden"}
              md:block
            `}
          >
            Admin Panel
          </h2>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lwd-sidebar-toggle rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden dark:hover:bg-gray-700"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
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

        {/* Navigation links */}
        <nav className="lwd-sidebar-nav flex-1 space-y-2 overflow-y-auto p-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `lwd-nav-link flex items-center gap-3 rounded-xl px-3 py-2 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md lwd-nav-active"
                    : "text-gray-700 hover:bg-blue-50 dark:text-gray-300 dark:hover:bg-gray-700 lwd-nav-inactive"
                }`
              }
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>

              {/* Label – hidden on mobile when sidebar is collapsed */}
              <span
                className={`
                  lwd-nav-label
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

      {/* Main content area */}
      <div className="lwd-main-content flex flex-1 flex-col min-w-0">
        <main className="lwd-main lwd-page flex-1 overflow-y-auto bg-gray-50 p-4 shadow-inner dark:bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}