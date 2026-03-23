import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

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
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Theme management: apply dark class to <html> and persist preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-linear-to-br from-slate-300 via-blue-400 to-indigo-600">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "w-64" : "w-16"}
          md:w-64
          transition-all duration-300
          bg-white/80 backdrop-blur-xl shadow-xl
          flex flex-col
        `}
        aria-label="Admin navigation sidebar"
      >
        {/* Logo & toggle */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2
            className={`
              font-bold text-gray-800 tracking-wide
              ${sidebarOpen ? "block" : "hidden"}
              md:block
            `}
          >
            Admin Panel
          </h2>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-xl p-1 rounded-md hover:bg-gray-200 transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            ☰
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2 rounded-xl font-medium
                transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-100"
                }
                `
              }
            >
              <span className="text-lg" aria-hidden="true">{item.icon}</span>

              {/* Label – hidden on mobile when sidebar is collapsed */}
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

        {/* Dark mode toggle */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-md text-sm flex items-center justify-center"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span aria-hidden="true">{darkMode ? "☀" : "🌙"}</span>
            <span
              className={`
                ml-2
                ${sidebarOpen ? "inline" : "hidden"}
                md:inline
              `}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto bg-white/90 backdrop-blur-lg shadow-inner p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}