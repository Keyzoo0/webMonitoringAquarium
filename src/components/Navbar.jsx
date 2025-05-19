// src/components/Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 shadow text-white">
      <h1 className="text-xl font-bold">AquaMonitor</h1>
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg py-2 z-50">
            <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-600">
              Home
            </a>
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-600">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-600">
              Settings
            </a>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
