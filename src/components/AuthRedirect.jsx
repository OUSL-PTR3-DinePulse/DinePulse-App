import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AuthRedirect({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/feedbackform" replace />;

  return children;
}
