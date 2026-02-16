import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RecruiterAdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);

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
    { to: "/recruiter-admin", label: "📊 Dashboard" },
    { to: "/recruiter-admin/company-profile", label: "🏢 Company Profile" },
    { to: "/recruiter-admin/manage-recruiter", label: "👥 Manage Recruiter" },
    { to: "/recruiter-admin/managejob", label: "📄 Manage Jobs" },
    { to: "/recruiter-admin/applications", label: "📑 Applications" },
  ];

  return (
    <div className="flex h-screen w-full bg-linear-to-br from-slate-300 via-blue-400 to-indigo-600 transition-all duration-500">

      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl shadow-xl flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 tracking-wide">
            Recruiter Admin
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/recruiter-admin"}
              className={({ isActive }) =>
                `
                block px-4 py-2 rounded-xl font-medium
                transition-all duration-300 no-underline!
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                    : "text-gray-700 hover:bg-blue-100"
                }
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 bg-white/85 backdrop-blur-lg shadow-2xl transition-all duration-500">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
