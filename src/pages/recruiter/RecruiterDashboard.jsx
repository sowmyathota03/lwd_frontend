import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecruiterDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Apply theme
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
    { to: "/recruiter", label: "Dashboard", icon: "📊" },
    { to: "/recruiter/company-profile", label: "Company Profile", icon: "🏢" },
    { to: "/recruiter/managejob", label: "Jobs", icon: "📄" },
    { to: "/recruiter/createjob", label: "Create Job", icon: "➕" },
    { to: "/recruiter/applications", label: "Applications", icon: "📑" },
    { to: "/recruiter/job-seekers", label: "Job Seekers", icon: "👤" },
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

        {/* Theme Toggle */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all
              bg-blue-600 text-white hover:bg-blue-700
              dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="lwd-card flex items-center justify-between px-4 py-3 shadow-sm">
          <h1 className="lwd-title text-lg">
            Welcome Recruiter 👋
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="lwd-btn-outline text-sm"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}