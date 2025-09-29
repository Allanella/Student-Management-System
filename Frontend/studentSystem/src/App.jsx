import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import StudentLogin from "./pages/StudentLogin"; // ✅ New Student Login
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import Dashboard from "./pages/Dashboard";
import StudentSignUp from "./pages/StudentSignUp";
import { useState } from "react";

function App() {
  const [userRole, setUserRole] = useState(null); // "student" | "admin" | null

  return (
    <Router>
      <h1 className="text-4xl font-bold text-center mt-10 text-gray-800">
        Student Management System
      </h1>
      <Navbar role={userRole} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/student-signup" element={<StudentSignUp />} />

        {/* Student login/signup */}
        <Route
          path="/student-login"
          element={<StudentLogin setUserRole={setUserRole} />}
        />

        {/* Admin login */}
        <Route
          path="/admin-login"
          element={<AdminLogin setUserRole={setUserRole} />}
        />

        {/* Protected admin route */}
        <Route
          path="/admin"
          element={
            userRole === "admin" ? (
              <h2 className="text-2xl text-center mt-10">Welcome Admin! 🎉</h2>
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />

        {/* Protected student route */}
        <Route
          path="/students"
          element={
            userRole === "student" ? (
              <StudentsPage />
            ) : (
              <Navigate to="/student-login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
