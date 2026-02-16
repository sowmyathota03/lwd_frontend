import { NavLink } from "react-router-dom";
import "./RecruiterAdminDashboard.css";

export default function RecruiterAdminDashboardPage() {
  return (
    <div className="dashboard-layout">
      
      {/* Top Navbar */}
      <header className="navbar">
        <h2 className="logo">Recruiter Admin Panel</h2>

        <nav className="nav-links">
          <NavLink
            to="recruiter-admin/company-profile"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Company Profile
          </NavLink>          <NavLink
            to="recruiter-admin/recruiters"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Recruiters
          </NavLink>
          <NavLink
            to="/recruiters/managejob"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Jobs
          </NavLink>
          <NavLink
            to="/recruiter/applications"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Applications
          </NavLink>
        </nav>
      </header>
    </div>
  );
}
