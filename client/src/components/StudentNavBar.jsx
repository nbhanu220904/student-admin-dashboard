import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const StudentNavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo / Branding */}
      <h1 className="text-2xl font-bold cursor-pointer">
        <span className="text-blue-600">Student Dashboard</span>
      </h1>

      {/* User info and logout */}
      <div className="flex items-center space-x-4">
        {/* <span className="text-gray-700">Welcome, {user?.name}</span> */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavBar;
