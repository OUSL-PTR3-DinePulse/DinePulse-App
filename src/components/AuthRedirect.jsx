import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirect({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/feedbackform" replace />;

  return children;
}
