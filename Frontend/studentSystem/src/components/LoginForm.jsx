import { useState } from "react";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginForm({ userType }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
          // Note: userType is not included as it's not in your LoginRequest DTO
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setMessage(`✓ Login successful!`);
          // Handle successful login - store token, redirect, etc.
          console.log('Login successful:', data);
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          // Redirect or update app state here
        } else {
          // Check for pending approval or other specific messages
          if (data.message && data.message.toLowerCase().includes("pending")) {
            setMessage("Your account is pending admin approval");
          } else {
            setMessage(data.message || "Login failed. Please try again.");
          }
        }
      } else {
        // Handle HTTP error statuses (401, 403, etc.)
        if (data.message && data.message.toLowerCase().includes("pending")) {
          setMessage("Your account is pending admin approval");
        } else if (response.status === 401) {
          setMessage(data.message || "Invalid email or password");
        } else if (response.status === 403) {
          setMessage(data.message || "Access denied");
        } else {
          setMessage(data.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      setMessage("Network error. Please check if the backend is running.");
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
          <User className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, email: e.target.value }));
              setMessage("");
            }}
            placeholder="your.email@school.com"
            className="w-full px-3 py-3 outline-none"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>
        <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
          <Lock className="w-5 h-5 text-gray-400 ml-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }));
              setMessage("");
            }}
            placeholder="••••••••"
            className="w-full px-3 py-3 outline-none"
            disabled={isLoading}
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 text-gray-600 hover:text-gray-800"
            type="button"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm text-center ${
            message.includes("✓")
              ? "bg-green-100 text-green-700"
              : message.toLowerCase().includes("pending")
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Logging in...
          </>
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            Login as {userType}
          </>
        )}
      </button>

      {/* Demo info - you can remove this in production */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs text-gray-600 text-center">
          Login with your registered email and password. 
          If your account is pending approval, you'll see a notification.
        </p>
      </div>
    </div>
  );
}