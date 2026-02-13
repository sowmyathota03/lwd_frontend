import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const {user, logout} = useContext(AuthContext);
  return (
    <>
      
      <nav className="top-navbar">
        <div className="topbar-container">
          <p>Flexible hiring solutions for growing teams</p>
          <NavLink to="/Register" className="topbar-link">
            Register with LWD
          </NavLink>
        </div>
      </nav>

      
      <header className="main-navbar">
        <div className="navbar-container">
          
          <div className="logo">
           <h1>LWD</h1>
          </div>

          <ul className="nav-links">
            <li><NavLink to="/"><b>Home</b></NavLink></li>
            <li><NavLink to="/Jobs">Jobs</NavLink></li>
            <li><NavLink to="/Companies">Companies</NavLink></li>
            <li><NavLink to="/Career">Careers</NavLink></li>
          </ul>

         {/* Right Side Auth Buttons */}
          <div className="d-flex align-items-center">

            {!user ? (
              <>
                <Link to="/login" className="btn btn-primary btn-outline-light me-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-warning">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-dark me-3">
                  Welcome, {user?.sub}
                </span>

                <Link to="/profile" className="btn btn-outline-warning me-2">
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      </header>
    </>
  );
}

export default NavBar;
 