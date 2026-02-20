import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
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
    { to: "/admin", label: "📊 Dashboard" },
    { to: "/admin/users", label: "👥 Manage Users" },
    { to: "/admin/companies", label: "🏢 Manage Companies" },
    { to: "/admin/managejob", label: "📄 Manage Jobs" },
    { to: "/admin/applications", label: "📑 Applications" },
  ];

 return (
  <div className="flex h-screen w-screen overflow-hidden bg-linear-to-br from-slate-300 via-blue-400 to-indigo-600">

    {/* Sidebar */}
    <aside className="w-64 min-w-[16rem] bg-white/80 backdrop-blur-xl shadow-xl flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `
              block px-4 py-2 rounded-xl font-medium
              transition-all duration-300 no-underline!
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
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
    <div className="flex-1 flex flex-col min-w-0">
      <main className="flex-1 overflow-y-auto bg-white/90 backdrop-blur-lg shadow-inner">
        <Outlet />
      </main>
    </div>

  </div>
);

}
