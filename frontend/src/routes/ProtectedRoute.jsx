import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Wraps a route and only renders it if the user is logged in
 * and (optionally) has the required role.
 *
 * Usage:
 * <ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>
 */
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="page-loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role -> send to their own dashboard
    const redirectPath = user.role === "ADMIN" ? "/admin/dashboard" : "/student/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
