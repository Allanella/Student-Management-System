import { useState } from "react";
import HomePage from "./components/HomePage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userType, setUserType] = useState("");

  return (
    <>
      {currentPage === "home" ? (
        <HomePage setCurrentPage={setCurrentPage} setUserType={setUserType} />
      ) : (
        <AuthPage
          userType={userType}
          setCurrentPage={setCurrentPage}
          setUserType={setUserType}
        />
      )}
    </>
  );
}
