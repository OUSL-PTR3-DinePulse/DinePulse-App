import {Routes, Route } from "react-router";
import AdminDashboard from "./pages/adminDashboard";
import FeedbackFormPage from "./pages/feedbackformpage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/feedbackform" element={<FeedbackFormPage />} />
      </Routes>
  );
}

export default App;
