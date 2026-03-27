import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentSubscription } from "../../api/pricingApi";

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = useMemo(() => {
    return (
      user?.name ||
      user?.fullName ||
      user?.username ||
      user?.email ||
      user?.sub ||
      "User"
    );
  }, [user]);

  const navItemClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600 after:rounded"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
    }`;

  const closeMenus = () => {
    setDropdownOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      if (!user) {
        setCurrentPlan(null);
        return;
      }

      if (user.role === "ADMIN" || user.role === "RECRUITER_ADMIN") {
        setCurrentPlan(null);
        return;
      }

      try {
        const data = await getCurrentSubscription();
        setCurrentPlan(data || null);
      } catch (error) {
        console.error("Failed to fetch current subscription:", error);
        setCurrentPlan(null);
      }
    };

    fetchCurrentPlan();
  }, [user]);

  const getPlanRoute = () => {
    if (!user) return "/login";
    if (user.role === "JOB_SEEKER") return "/plans/candidate";
    if (user.role === "RECRUITER") return "/plans/recruiter";
    return null;
  };

  const getPlanLabel = () => {
    if (!user) return "Plans";

    if (user.role === "ADMIN" || user.role === "RECRUITER_ADMIN") {
      return null;
    }

    const isFree = !currentPlan || currentPlan?.planName === "FREE";

    if (user.role === "JOB_SEEKER") {
      return isFree ? "Upgrade to Premium 🚀" : "My Plan";
    }

    if (user.role === "RECRUITER") {
      return isFree ? "Upgrade Plan 🚀" : "My Plan";
    }

    return "Plans";
  };

  const getPlanBadge = () => {
    if (!user) return null;
    if (user.role === "ADMIN" || user.role === "RECRUITER_ADMIN") return null;

    const plan = currentPlan?.planName || "FREE";

    const styles = {
      FREE: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
      BASIC: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      STANDARD:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
      PREMIUM:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    };

    return (
      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold ${
          styles[plan] || styles.FREE
        }`}
      >
        {plan}
      </span>
    );
  };

  const planRoute = getPlanRoute();
  const planLabel = getPlanLabel();

  return (
    <div>
      <div className="bg-gray-900 text-white text-center text-sm py-2 dark:bg-black">
        Flexible hiring solutions for growing teams
      </div>

      <header className="sticky top-0 z-50 lwd-navbar">
        <div className="flex justify-between items-center px-4 md:px-6">
          <Link
            to="/"
            className="text-2xl font-bold text-slate-900 dark:text-white"
            onClick={closeMenus}
          >
            LWD
          </Link>

          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" end className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navItemClass}>
              Jobs
            </NavLink>
            {user?.role === "JOB_SEEKER" && (
              <NavLink to="/recommended" className={navItemClass}>
                Recommended
              </NavLink>
            )}
            <NavLink to="/companies" className={navItemClass}>
              Companies
            </NavLink>
            <NavLink to="/career" className={navItemClass}>
              Careers
            </NavLink>
          </nav>

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
                {planRoute && planLabel && (
                  <NavLink
                    to={planRoute}
                    className={({ isActive }) =>
                      `relative px-2 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "text-blue-600"
                          : currentPlan?.planName === "FREE" || !currentPlan
                          ? "text-orange-600 animate-pulse hover:text-orange-700"
                          : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                      }`
                    }
                  >
                    {planLabel}
                  </NavLink>
                )}

                <div
                  className="relative flex items-center gap-2 cursor-pointer"
                  ref={dropdownRef}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-3"
                  >
                    <div className="lwd-avatar">
                      {displayName?.charAt(0)?.toUpperCase()}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="lwd-text font-medium">{displayName}</span>

                      {planRoute ? <Link to={planRoute}>{getPlanBadge()}</Link> : null}
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-52 lwd-card py-2 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={closeMenus}
                      >
                        Profile
                      </Link>

                      <Link
                        to="/change-password"
                        className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={closeMenus}
                      >
                        Change Password
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={closeMenus}
                      >
                        Settings
                      </Link>

                      {user?.role === "JOB_SEEKER" && (
                        <Link
                          to="/my/applications"
                          className="block px-4 py-2 lwd-text hover:bg-gray-100 dark:hover:bg-slate-700"
                          onClick={closeMenus}
                        >
                          My Applications
                        </Link>
                      )}

                      <hr className="my-2 border-gray-200 dark:border-gray-700" />

                      <button
                        onClick={() => {
                          logout();
                          closeMenus();
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

          <button
            className="md:hidden text-gray-700 dark:text-gray-300 text-2xl"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden px-4 py-4 space-y-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
            <NavLink to="/" end className={navItemClass} onClick={closeMenus}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navItemClass} onClick={closeMenus}>
              Jobs
            </NavLink>
            {user?.role === "JOB_SEEKER" && (
              <NavLink
                to="/recommended"
                className={navItemClass}
                onClick={closeMenus}
              >
                Recommended
              </NavLink>
            )}
            <NavLink
              to="/companies"
              className={navItemClass}
              onClick={closeMenus}
            >
              Companies
            </NavLink>
            <NavLink to="/career" className={navItemClass} onClick={closeMenus}>
              Careers
            </NavLink>

            {!user ? (
              <div className="flex flex-col gap-3 pt-3">
                <Link to="/register" className="lwd-btn-primary" onClick={closeMenus}>
                  Register
                </Link>
                <Link to="/login" className="lwd-btn-secondary" onClick={closeMenus}>
                  Login
                </Link>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="lwd-avatar">
                    {displayName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="lwd-text font-medium">{displayName}</p>
                    {getPlanBadge()}
                  </div>
                </div>

                <Link to="/profile" className="block lwd-text" onClick={closeMenus}>
                  Profile
                </Link>

                <Link
                  to="/change-password"
                  className="block lwd-text"
                  onClick={closeMenus}
                >
                  Change Password
                </Link>

                <Link to="/settings" className="block lwd-text" onClick={closeMenus}>
                  Settings
                </Link>

                {user?.role === "JOB_SEEKER" && (
                  <Link
                    to="/my/applications"
                    className="block lwd-text"
                    onClick={closeMenus}
                  >
                    My Applications
                  </Link>
                )}

                {planRoute && planLabel && (
                  <Link to={planRoute} className="block lwd-text" onClick={closeMenus}>
                    {planLabel}
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    closeMenus();
                  }}
                  className="block text-left text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default NavBar;