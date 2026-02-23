import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecruiterAdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dark mode logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navItems = [
    { to: "/recruiter-admin", label: "Dashboard", icon: "📊" },
    { to: "/recruiter-admin/company-profile", label: "Company Profile", icon: "🏢" },
    { to: "/recruiter-admin/manage-recruiter", label: "Manage Recruiter", icon: "👥" },
    { to: "/recruiter-admin/managejob", label: "Manage Jobs", icon: "📄" },
    { to: "/recruiter/createjob", label: "Create Job", icon: "➕" },
    { to: "/recruiter-admin/applications", label: "Applications", icon: "📑" },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-linear-to-br from-slate-300 via-blue-400 to-indigo-600">

      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? "w-64" : "w-16"}
          md:w-64
          transition-all duration-300
          bg-white/80 backdrop-blur-xl shadow-xl flex flex-col
        `}
      >

        {/* Logo + Toggle */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2
            className={`
              font-bold text-gray-800 tracking-wide
              ${sidebarOpen ? "block" : "hidden"}
              md:block
            `}
          >
            Recruiter Admin
          </h2>

          {/* Mobile Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-xl"
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
              end={item.to === "/recruiter-admin"}
              onClick={() => setSidebarOpen(false)}
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

        {/* Theme Toggle */}
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-md text-sm"
          >
            {darkMode ? "☀" : "🌙"}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto bg-white/90 backdrop-blur-lg shadow-inner p-4">
          <Outlet />
        </main>
      </div>

    </div>
  );
}