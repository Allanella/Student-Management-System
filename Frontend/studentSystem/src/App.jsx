import { useState } from "react";
import HomePage from "./components/HomePage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Function to handle successful login
  const handleLoginSuccess = (response) => {
    setUserData(response);
    setIsAuthenticated(true);
    setUserType(response.role);
    // Store token in localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("userRole", response.role);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setUserType("");
    setCurrentPage("home");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  };

  // Render logic
  if (isAuthenticated) {
    // Show dashboard based on role
    if (userType === "STUDENT") {
      return <StudentDashboard userData={userData} onLogout={handleLogout} />;
    } else if (userType === "TEACHER") {
      return <TeacherDashboard userData={userData} onLogout={handleLogout} />;
    } else if (userType === "ADMIN") {
      return <AdminDashboard userData={userData} onLogout={handleLogout} />;
    }
  }

  // Show login/signup or home page
  return (
    <>
      {currentPage === "home" ? (
        <HomePage setCurrentPage={setCurrentPage} setUserType={setUserType} />
      ) : (
        <AuthPage
          userType={userType}
          setCurrentPage={setCurrentPage}
          setUserType={setUserType}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}