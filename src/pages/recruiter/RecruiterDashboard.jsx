
import { NavLink, Outlet } from "react-router-dom";

export default function RecuiterAdminDashboard() {

  return (
    <div className="d-flex">

      {/* ✅ FIXED SIDEBAR */}
      <div
        className="bg-dark text-white p-3 position-fixed"
        style={{
          width: "250px",
          height: "100vh",
          top: 50,
          left: 0,
        }}
      >
        <h4 className="text-center mb-4">Recuiter Admin Panel</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <NavLink to="/recruiter" end className="nav-link text-white">
              📊 Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink to="/recruiter/company-profile" className="nav-link text-white">
              🏢 Company Profile
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink to="/recruiter/managejob" className="nav-link text-white">
              📄 Manage Jobs
            </NavLink>
          </li>


          <li className="nav-item mb-2">
            <NavLink to="/recruiter/applications" className="nav-link text-white">
              📄 Manage Applications
            </NavLink>
          </li>
        </ul>
      </div>

      {/* ✅ RIGHT SIDE CONTENT */}
      <div
        className="grow"
        style={{
          marginLeft: "250px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* ✅ SCROLLABLE OUTLET AREA */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Outlet />
        </div>

      </div>
    </div>
  );
}
