import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupForm({ userType }) {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    employeeId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Separate visibility states
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.fullName || !formData.confirmPassword) {
      setMessage("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const signupData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: userType.toUpperCase(),
      };

      if (userType === "Student") {
        if (!formData.studentId) {
          setMessage("Student ID is required");
          setIsLoading(false);
          return;
        }
        signupData.studentId = formData.studentId;
      } else if (userType === "Teacher") {
        if (!formData.employeeId) {
          setMessage("Employee ID is required");
          setIsLoading(false);
          return;
        }
        signupData.employeeId = formData.employeeId;
      }

      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setMessage("Account created! Wait for admin approval");
        setFormData({
          fullName: "",
          studentId: "",
          employeeId: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check if the backend is running.");
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, fullName: e.target.value }));
            setMessage("");
          }}
          placeholder="John Doe"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          disabled={isLoading}
          required
        />
      </div>

      {/* Student or Teacher ID */}
      {userType === "Student" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Student ID *
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, studentId: e.target.value }));
              setMessage("");
            }}
            placeholder="STU-2024-001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
            required
          />
        </div>
      )}

      {userType === "Teacher" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employee ID *
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, employeeId: e.target.value }));
              setMessage("");
            }}
            placeholder="EMP-2024-001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
            required
          />
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
            setMessage("");
          }}
          placeholder="your.email@school.com"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          disabled={isLoading}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password * (min. 6 characters)
        </label>
        <div className="relative">
          <input
            type={viewPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
              setMessage("");
            }}
            placeholder="••••••••"
            className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
            minLength={6}
            required
          />
          <button
            type="button"
            onClick={() => setViewPassword(!viewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            disabled={isLoading}
          >
            {viewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={viewConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
              setMessage("");
            }}
            placeholder="••••••••"
            className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            disabled={isLoading}
          >
            {viewConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm text-center ${
            message.includes("Account created") 
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleSignup}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-700 text-center">
          After signing up, your account will be pending admin approval before you can login.
        </p>
      </div>
    </div>
  );
}
