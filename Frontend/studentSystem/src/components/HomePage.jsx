import { BookOpen, User, Users, Shield } from "lucide-react";

export default function HomePage({ setCurrentPage, setUserType }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <BookOpen className="w-16 h-16 mx-auto text-blue-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">EduPortal</h1>
        <p className="text-gray-600 mb-8">Educational Management System</p>

        <div className="space-y-4">
          <button
            onClick={() => {
              setUserType("Student");
              setCurrentPage("auth");
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-3"
          >
            <User className="w-5 h-5" />
            Student Login
          </button>

          <button
            onClick={() => {
              setUserType("Teacher");
              setCurrentPage("auth");
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-3"
          >
            <Users className="w-5 h-5" />
            Teacher Login
          </button>

          <button
            onClick={() => {
              setUserType("Admin");
              setCurrentPage("auth");
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-3"
          >
            <Shield className="w-5 h-5" />
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
