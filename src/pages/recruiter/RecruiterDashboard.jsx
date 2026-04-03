import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

export default function RecruiterDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const navItems = [
    { to: "/recruiter", label: "Dashboard", icon: "📊" },
    { to: "/recruiter/company-profile", label: "Company Profile", icon: "🏢" },
    { to: "/recruiter/managejob", label: "Jobs", icon: "📄" },
    { to: "/recruiter/createjob", label: "Create Job", icon: "➕" },
    { to: "/recruiter/applications", label: "Applications", icon: "📑" },
    { to: "/recruiter/job-seekers", label: "Job Seekers", icon: "👤" },
    { to: "/recruiter/messaging", label: "Messaging", icon: "💬" },
  ];

  return (
    <div className="lwd-page flex h-screen w-screen overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "w-64" : "w-16"}
          md:w-64
          transition-all duration-300
          bg-white border-r border-gray-200
          dark:bg-slate-800 dark:border-gray-700
          flex flex-col shadow-lg
        `}
      >

        {/* Logo + Toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2
            className={`
              font-bold tracking-wide lwd-title
              ${sidebarOpen ? "block" : "hidden"}
              md:block
            `}
          >
            Recruiter Panel
          </h2>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-xl text-gray-700 dark:text-gray-300"
          >
            ☰
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/recruiter"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2 rounded-xl font-medium
                transition-all duration-300
                ${isActive
                  ? "bg-blue-600 text-white shadow-md dark:bg-blue-500"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
                }
                `
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}