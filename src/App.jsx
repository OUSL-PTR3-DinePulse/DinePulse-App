import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import Feedbackformpage from './pages/FeedbackFormPage';
import CustomerView from './pages/CustomerView'
import AdminLogin from './pages/AdminLogin'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from "./pages/ResetPassword";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      {/* USER AUTH */}
      <Routes>
        {/* Public but blocked when logged in */}
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />

        <Route
          path="/forgotpassword"
          element={
            <AuthRedirect>
              <ForgotPassword />
            </AuthRedirect>
          }
        />

        {/* Public page, but blocks logged users */}
        <Route
          path="/customerview"
          element={
            <AuthRedirect>
              <CustomerView />
            </AuthRedirect>
          }
        />

        {/* Protected User Page */}
        <Route
          path="/feedbackform"
          element={
            <ProtectedRoute>
              <Feedbackformpage />
            </ProtectedRoute>
          }
        />

        {/* Reset password is public (token-based) */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin routes wrapped with AdminAuth */}
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminLogin />
            </AdminAuthProvider>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminAuthProvider>
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            </AdminAuthProvider>
          }
        />

        {/* Default → send logged users to Feedbackformpage */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Feedbackformpage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
