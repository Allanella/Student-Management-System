import { useState } from "react";

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

  const handleSignup = () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      setMessage("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage(`✓ ${userType} account created successfully!`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
          placeholder="John Doe"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {userType === "Student" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Student ID
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, studentId: e.target.value }))
            }
            placeholder="STU-2024-001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {userType === "Teacher" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, employeeId: e.target.value }))
            }
            placeholder="EMP-2024-001"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="your.email@school.com"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="••••••••"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="••••••••"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm text-center ${
            message.includes("✓")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleSignup}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Create Account
      </button>
    </div>
  );
}
