import { useAdminAuth } from "../context/AdminAuthContext";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) return <Navigate to="/customerview" />;

  return children;
}
