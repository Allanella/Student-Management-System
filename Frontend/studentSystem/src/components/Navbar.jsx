import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Dashboard */}
          <a
            href="/dashboard"
            className="text-xl font-bold px-5 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300"
          >
            Dashboard
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/students" className="hover:text-gray-300">
              Students
            </a>
            <a href="/admin" className="hover:text-gray-300">
              Admin
            </a>
            <a href="/courses" className="hover:text-gray-300">
              Courses
            </a>

            {/* Logout with right spacing */}
            <a
              href="/logout"
              className="px-5 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
            >
              Logout
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-4 space-y-2">
          <a
            href="/dashboard"
            className="block px-3 py-2 rounded-md hover:bg-gray-600"
          >
            Dashboard
          </a>
          <a
            href="/students"
            className="block px-3 py-2 rounded-md hover:bg-gray-600"
          >
            Students
          </a>
          <a
            href="/teachers"
            className="block px-3 py-2 rounded-md hover:bg-gray-600"
          >
            Teachers
          </a>
          <a
            href="/courses"
            className="block px-3 py-2 rounded-md hover:bg-gray-600"
          >
            Courses
          </a>
          <a
            href="/logout"
            className="block px-3 py-2 rounded-md bg-red-600 hover:bg-red-700"
          >
            Logout
          </a>
        </div>
      )}
    </nav>
  );
}
