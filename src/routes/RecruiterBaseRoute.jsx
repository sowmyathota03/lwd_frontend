import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function RecruiterBaseRoute() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "RECRUITER") {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (user.status !== "ACTIVE") {
    return <Navigate to="/account-pending" replace />;
  }

  return <Outlet />;
}

export default RecruiterBaseRoute;