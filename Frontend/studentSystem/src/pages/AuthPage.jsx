import { useState } from "react";
import { BookOpen } from "lucide-react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function AuthPage({ userType, setCurrentPage, setUserType }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">EduPortal</h1>
          </div>
          <p className="text-gray-600 mb-2">{userType} Portal</p>

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                !isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {isLogin ? (
          <LoginForm userType={userType} />
        ) : (
          <SignupForm userType={userType} />
        )}

        {/* Back Button */}
        <button
          onClick={() => {
            setCurrentPage("home");
            setUserType("");
          }}
          className="w-full mt-4 text-gray-600 hover:text-gray-800 font-semibold py-2 transition"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
