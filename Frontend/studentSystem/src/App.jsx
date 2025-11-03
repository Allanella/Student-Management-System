import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import AuthPage from "./pages/AuthPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check for existing login on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const storedUserData = localStorage.getItem("userData");
    
    if (token && userRole) {
      setIsAuthenticated(true);
      setUserType(userRole);
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = (response) => {
    setUserData(response);
    setIsAuthenticated(true);
    setUserType(response.role);
    localStorage.setItem("token", response.token);
    localStorage.setItem("userRole", response.role);
    localStorage.setItem("userData", JSON.stringify(response));
  };

  // Function to handle admin login
  const handleAdminLogin = (response) => {
    setUserData(response);
    setIsAuthenticated(true);
    setUserType("ADMIN");
    localStorage.setItem("token", response.token);
    localStorage.setItem("userRole", "ADMIN");
    localStorage.setItem("userData", JSON.stringify(response));
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setUserType("");
    setCurrentPage("home");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
  };

  // Navigate to admin login
  const goToAdminLogin = () => {
    setCurrentPage("admin-login");
  };

  // Navigate back to home
  const goToHome = () => {
    setCurrentPage("home");
  };

  // Render logic
  if (isAuthenticated) {
    if (userType === "STUDENT") {
      return <StudentDashboard userData={userData} onLogout={handleLogout} />;
    } else if (userType === "TEACHER") {
      return <TeacherDashboard userData={userData} onLogout={handleLogout} />;
    } else if (userType === "ADMIN") {
      return <AdminDashboard userData={userData} onLogout={handleLogout} />;
    }
  }

  // Show appropriate page based on currentPage state
  return (
    <>
      {currentPage === "home" && (
        <HomePage 
          setCurrentPage={setCurrentPage} 
          setUserType={setUserType} 
          onAdminLogin={goToAdminLogin} 
        />
      )}
      
      {currentPage === "admin-login" && (
        <AdminLogin 
          onLoginSuccess={handleAdminLogin}
          onBackToHome={goToHome}
        />
      )}
      
      {(currentPage === "login" || currentPage === "signup") && (
        <AuthPage
          userType={userType}
          setCurrentPage={setCurrentPage}
          setUserType={setUserType}
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={goToHome}
        />
      )}
    </>
  );
}