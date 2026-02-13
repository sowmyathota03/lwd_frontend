import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRole }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
