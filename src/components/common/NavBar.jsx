import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCurrentSubscription } from "../../api/PricingApi";

import NotificationBell from "./NotificationBell";
import MessageBadge from "./MessageBadge";

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
    `relative px-3 py-2 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "text-blue-600 after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[3px] after:bg-blue-600 after:rounded-t-md"
        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  const mobileNavItemClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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

      if (user.role === "ADMIN") {
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
    if (user.role === "COMPANY_ADMIN") return "/plans/company-admin";
    return null;
  };

  const getPlanLabel = () => {
    if (!user) return "Plans";

    if (user.role === "ADMIN") {
      return null;
    }

    const isFree = !currentPlan || currentPlan?.planName === "FREE";

    if (user.role === "JOB_SEEKER") {
      return isFree ? "Upgrade to Premium 🚀" : "My Plan";
    }

    if (user.role === "RECRUITER") {
      return isFree ? "Upgrade Plan 🚀" : "My Plan";
    }

    if (user.role === "COMPANY_ADMIN") {
      return isFree ? "Upgrade Admin Plan 🚀" : "My Admin Plan";
    }

    return "Plans";
  };

  const getPlanBadge = () => {
    if (!user) return null;
    if (user.role === "ADMIN") return null;

    const plan = currentPlan?.planName || "FREE";

    const styles = {
      FREE: "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
      BASIC:
        "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50",
      STANDARD:
        "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800/50",
      PREMIUM:
        "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/50",
    };

    return (
      <span
        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide ${styles[plan]}`}
      >
        {plan}
      </span>
    );
  };

  const planRoute = getPlanRoute();
  const planLabel = getPlanLabel();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 dark:bg-black text-slate-100 text-center text-xs py-2 font-medium tracking-wide">
        Flexible hiring solutions for growing teams
      </div>

      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/assets/lwd-logo.png"
                alt="LWD-Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block tracking-tight">
                Portal
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-1">
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

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm px-4 py-2 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-5">
                  {/* Plans Link */}
                  {planRoute && planLabel && (
                    <NavLink
                      to={planRoute}
                      className={({ isActive }) =>
                        `relative px-3 py-2 text-sm font-bold transition-all duration-300 rounded-full ${
                          isActive
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : currentPlan?.planName === "FREE" || !currentPlan
                              ? "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200/50 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`
                      }
                    >
                      {planLabel}
                    </NavLink>
                  )}

                  <div
                    className="relative flex items-center gap-3 cursor-pointer group"
                    ref={dropdownRef}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {/* User Info Container */}
                    <div className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white dark:ring-slate-800">
                        {displayName?.charAt(0)?.toUpperCase()}
                      </div>

                      {/* Name & Badge */}
                      <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-none mb-1">
                          {displayName}
                        </span>
                        <div onClick={(e) => e.stopPropagation()}>
                          {planRoute ? (
                            <Link to={planRoute} className="leading-none block">
                              {getPlanBadge()}
                            </Link>
                          ) : (
                            <div className="leading-none block">
                              {getPlanBadge()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-300 ml-1 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 transform origin-top-right transition-all duration-200">
                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Logged in as
                          </p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {user?.email || displayName}
                          </p>
                        </div>

                        <div className="px-2 space-y-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
                            onClick={closeMenus}
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            Profile
                          </Link>

                          <Link
                            to="/change-password"
                            className="flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
                            onClick={closeMenus}
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                              />
                            </svg>
                            Change Password
                          </Link>

                          <Link
                            to="/settings"
                            className="flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
                            onClick={closeMenus}
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            Settings
                          </Link>

                          {user?.role === "JOB_SEEKER" && (
                            <Link
                              to="/my-applications"
                              className="flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
                              onClick={closeMenus}
                            >
                              <svg
                                className="w-4 h-4 mr-3 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              My Applications
                            </Link>
                          )}
                        </div>

                        <div className="px-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                          <button
                            onClick={() => {
                              logout();
                              closeMenus();
                            }}
                            className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-3 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {
                    <div className="flex gap-1">
                      {/* Messages */}
                      {user?.role === "JOB_SEEKER" && (
                        <MessageBadge navItemClass={navItemClass} />
                      )}
                      {/* Notifications */}
                      <NotificationBell navItemClass={navItemClass} />
                    </div>
                  }
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-2">
              {user?.role === "JOB_SEEKER" && (
                <div className="flex z-50 gap-3">
                  {/* Messages */}
                  <NavLink to="/messaging" className={navItemClass}>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg">💬</span>
                      </div>

                      {/* Badge */}
                      <span className="absolute bottom-0.5 left-3 text-xs bg-blue-500 text-white px-2 py-0.5 mb-4 rounded-full">
                        3
                      </span>
                    </div>
                  </NavLink>

                  {/* Notifications */}
                  <NotificationBell navItemClass={navItemClass} />
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-200 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-inner">
            <NavLink
              to="/"
              end
              className={mobileNavItemClass}
              onClick={closeMenus}
            >
              Home
            </NavLink>
            <NavLink
              to="/jobs"
              className={mobileNavItemClass}
              onClick={closeMenus}
            >
              Jobs
            </NavLink>
            {user?.role === "JOB_SEEKER" && (
              <NavLink
                to="/recommended"
                className={mobileNavItemClass}
                onClick={closeMenus}
              >
                Recommended
              </NavLink>
            )}
            <NavLink
              to="/companies"
              className={mobileNavItemClass}
              onClick={closeMenus}
            >
              Companies
            </NavLink>
            <NavLink
              to="/career"
              className={mobileNavItemClass}
              onClick={closeMenus}
            >
              Careers
            </NavLink>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              {!user ? (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    onClick={closeMenus}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-base font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                    onClick={closeMenus}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center px-2">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base shadow-sm ring-2 ring-white dark:ring-slate-800">
                        {displayName?.charAt(0)?.toUpperCase()}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-slate-800 dark:text-white leading-tight">
                        {displayName}
                      </div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        {user?.email || "User Account"}
                      </div>
                    </div>
                    <div className="ml-auto">
                      {planRoute ? (
                        <Link to={planRoute} onClick={closeMenus}>
                          {getPlanBadge()}
                        </Link>
                      ) : (
                        <div>{getPlanBadge()}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 px-2 space-y-1">
                    <Link
                      to="/profile"
                      className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                      onClick={closeMenus}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/change-password"
                      className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                      onClick={closeMenus}
                    >
                      Change Password
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                      onClick={closeMenus}
                    >
                      Settings
                    </Link>
                    {user?.role === "JOB_SEEKER" && (
                      <Link
                        to="/my/applications"
                        className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                        onClick={closeMenus}
                      >
                        My Applications
                      </Link>
                    )}
                    {planRoute && planLabel && (
                      <Link
                        to={planRoute}
                        className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
                        onClick={closeMenus}
                      >
                        {planLabel}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="block w-full text-left px-3 py-2.5 mt-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
