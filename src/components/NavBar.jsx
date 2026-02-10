import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
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
            <li><NavLink to="/Profile">Profile</NavLink></li>
          </ul>

          <div className="nav-buttons">
            <NavLink to="/Login">
              <button className="login-btn">Login</button>
            </NavLink>
            <NavLink to="/Register">
              <button className="register-btn">Register</button>
            </NavLink>
          </div>

        </div>
      </header>
    </>
  );
}

export default NavBar;
 