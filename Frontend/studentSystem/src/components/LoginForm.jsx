import { useState } from "react";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginForm({ userType }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      setMessage("Please fill in all fields");
      return;
    }
    setMessage(`✓ Login successful as ${userType}! (Demo)`);
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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="your.email@school.com"
            className="w-full px-3 py-3 outline-none"
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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="••••••••"
            className="w-full px-3 py-3 outline-none"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 text-gray-600 hover:text-gray-800"
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
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
      >
        <LogIn className="w-5 h-5" />
        Login
      </button>
    </div>
  );
}
