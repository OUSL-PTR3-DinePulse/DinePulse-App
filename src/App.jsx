import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignUpPage";
import Dashboard from "./pages/adminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";
import Feedbackformpage from './pages/FeedbackFormPage';
import CustomerView from './pages/CustomerView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public but BLOCKED when logged in */}
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
          path="/customerview"
          element={
            <AuthRedirect>
              <CustomerView />
            </AuthRedirect>
          }
        />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedbackform"
          element={
            <ProtectedRoute>
              <Feedbackformpage />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<ProtectedRoute><Feedbackformpage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
