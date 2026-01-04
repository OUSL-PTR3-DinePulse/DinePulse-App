import {Routes, Route } from "react-router";
import AdminDashboard from "./pages/adminDashboard";
import FeedbackFormPage from "./pages/FeedbackFormPage";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/feedbackform" element={<FeedbackFormPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
  );
}

export default App;
