import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentSubscription } from "../../api/pricingApi";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
    `relative px-1 py-2 text-sm font-medium transition duration-300 ${isActive
      ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 after:rounded"
      : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
    }`;

  const displayName = user?.name || user?.sub;

  const handleDropdownClick = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (user) {
      getCurrentSubscription()
        .then(setCurrentPlan)
        .catch(() => setCurrentPlan(null));
    }
  }, [user]);

  const getPlanRoute = () => {
    if (!user) return "/login";
    if (user.role === "JOB_SEEKER") return "/plans/candidate";
    if (user.role === "RECRUITER") return "/plans/recruiter";
    return "/plans/candidate";
  };

  const getPlanLabel = () => {
    if (!user) return "Plans";
    const isFree = !currentPlan || currentPlan.planName === "FREE";

    if (user.role === "ADMIN") return null;

    if (user.role === "JOB_SEEKER") {
      return isFree ? "Upgrade to Premium 🚀" : "My Plan";
    }

    if (user.role === "RECRUITER") {
      return isFree ? "Upgrade Plan 🚀" : "My Plan";
    }

    return "Plans";
  };

  const getPlanBadge = () => {
    if (!user || user.role === "ADMIN") return null;

    const plan = currentPlan?.planName || "FREE";

    const styles = {
      FREE: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
      BASIC: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      STANDARD: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
      PREMIUM: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    };

    return (
      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${styles[plan]}`}>
        {plan}
      </span>
    );
  };

  return (
    <>
    <div className="">

      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-center text-sm py-2 dark:bg-black">
        Flexible hiring solutions for growing teams
      </div>

      <header className="sticky top-0 z-50 lwd-navbar">
        <div className="">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link to="/" className="text-2xl pl-6 font-bold text-slate-900 dark:text-white">
              LWD
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" end className={navItemClass}>Home</NavLink>
              <NavLink to="/jobs" className={navItemClass}>Jobs</NavLink>
              <NavLink to="/recommended" className={navItemClass}>Recommended</NavLink>
              <NavLink to="/companies" className={navItemClass}>Companies</NavLink>
              <NavLink to="/career" className={navItemClass}>Careers</NavLink>
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-6">
              {!user ? (
                <>
                  <Link to="/register" className="lwd-btn-primary">
                    Register
                  </Link>
                  <Link to="/login" className="lwd-btn-secondary">
                    Login
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-6">

                  {/* Plans */}
                  <NavLink
                    to={getPlanRoute()}
                    className={({ isActive }) =>
                      `relative px-2 py-2 text-sm font-semibold transition ${isActive
                        ? "text-blue-600"
                        : currentPlan?.planName === "FREE" || !currentPlan
                          ? "text-orange-600 animate-pulse hover:text-orange-700"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                      }`
                    }
                  >
                    {getPlanLabel()}
                  </NavLink>

                  <div
                    className="relative flex items-center gap-2 cursor-pointer"
                    ref={dropdownRef}
                  >

                    {/* Avatar */}
                    <div className="lwd-avatar">
                      {displayName?.charAt(0)?.toUpperCase()}
                    </div>

                    {/* Name */}
                    <div className="flex items-center gap-2">
                      <span className="lwd-text font-medium">
                        {displayName}
                      </span>

                      <Link to={getPlanRoute()}>
                        {getPlanBadge()}
                      </Link>
                    </div>

                    {/* Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                        }`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 top-12 w-48 lwd-card py-2 z-50">

                        <Link to="/profile" className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700" onClick={handleDropdownClick}>
                          Profile
                        </Link>

                        <Link to="/change-password" className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700" onClick={handleDropdownClick}>
                          Change Password
                        </Link>

                        <Link to="/settings" className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700" onClick={handleDropdownClick}>
                          Settings
                        </Link>

                        {user?.role === "JOB_SEEKER" && (
                          <Link to="/my/applications" className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700" onClick={handleDropdownClick}>
                            My Applications
                          </Link>
                        )}

                        <hr className="my-2 border-gray-200 dark:border-gray-700" />

                        <button
                          onClick={() => {
                            logout();
                            handleDropdownClick();
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                        >
                          Logout
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>

          </div>
        </div>
      </header>
    </div>
    </>
  );
}

export default NavBar;