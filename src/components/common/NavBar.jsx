import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role;

  const profilePath =
    role === "JOB_SEEKER"
      ? "/jobseeker/profile"
      : "/profile";

  const navItemClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition duration-300 no-underline! ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 after:rounded no-underline!"
        : "text-gray-700 hover:text-blue-600 no-underline!"
    }`;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-center text-sm py-2">
        Flexible hiring solutions for growing teams
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-blue-600 no-underline!">
              LWD
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" end className={navItemClass}>
                Home
              </NavLink>
              <NavLink to="/jobs" className={navItemClass}>
                Jobs
              </NavLink>
              <NavLink to="/companies" className={navItemClass}>
                Companies
              </NavLink>
              <NavLink to="/career" className={navItemClass}>
                Careers
              </NavLink>
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center space-x-4">

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 font-medium hover:text-blue-600 transition no-underline!"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-sm transition no-underline!"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-gray-700 font-medium">
                    {user?.sub}
                  </span>

                  <Link
                    to={profilePath}
                    className="border border-yellow-400 text-yellow-600 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-lg transition no-underline!"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition no-underline!"
                  >
                    Logout
                  </button>
                </>
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow">
            <NavLink to="/" end className="block text-gray-700">Home</NavLink>
            <NavLink to="/jobs" className="block text-gray-700">Jobs</NavLink>
            <NavLink to="/companies" className="block text-gray-700">Companies</NavLink>
            <NavLink to="/career" className="block text-gray-700">Careers</NavLink>

            <hr />

            {!user ? (
              <>
                <Link to="/login" className="block text-gray-700">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-yellow-400 text-black text-center py-2 rounded-lg font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to={profilePath} className="block text-gray-700">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full bg-red-500 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}

export default NavBar;
