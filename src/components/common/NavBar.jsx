import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItemClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 after:rounded"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const displayName = user?.name || user?.sub;

  // ✅ Close dropdown when clicking a menu item
  const handleDropdownClick = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-center text-sm py-2">
        Flexible hiring solutions for growing teams
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black">
              LWD
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" end className={navItemClass}>Home</NavLink>
              <NavLink to="/jobs" className={navItemClass}>Jobs</NavLink>
              <NavLink to="/companies" className={navItemClass}>Companies</NavLink>
              <NavLink to="/career" className={navItemClass}>Careers</NavLink>
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-6">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition duration-200"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-xl font-medium transition duration-200"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div
                  className="relative flex items-center gap-2 cursor-pointer"
                  ref={dropdownRef}
                >
                  {/* Profile Icon */}
                  <div className="w-9 h-9 bg-gray-400 text-white flex items-center justify-center rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
                    </svg>
                  </div>

                  {/* Name / Email */}
                  <span className="text-gray-700 font-medium">{displayName}</span>

                  {/* Dropdown Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClick}
                      >
                        Profile
                      </Link>

                      <Link
                        to="/change-password"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClick}
                      >
                        Change Password
                      </Link>

                      <Link
                        to="/my/applications"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={handleDropdownClick}
                      >
                        My Applications
                      </Link>

                      <hr className="my-2" />

                      <button
                        onClick={() => { logout(); handleDropdownClick(); }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;