import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HouseIcon, UserIcon, PencilIcon, LogOutIcon } from "lucide-react";

const navItems = [
  { to: "/student/dashboard", label: "Dashboard", Icon: HouseIcon },
  { to: "/student/profile", label: "Profile", Icon: UserIcon },
  { to: "/student/update", label: "Update Profile", Icon: PencilIcon },
];

const SideBar = () => {
  const student = JSON.parse(localStorage.getItem("student"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Top Nav Items */}
      <div className="px-4 py-6">
        <div className="space-y-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className="border-t border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40" // replace with actual student image if available
            alt="profile"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <h1 className="text-sm font-medium">
              {student?.username || "Student"}
            </h1>
            <p className="text-xs text-gray-500">Student</p>
          </div>
        </div>
        <LogOutIcon
          onClick={handleLogout}
          className="w-5 text-gray-600 hover:text-red-600 cursor-pointer transition"
        />
      </div>
    </div>
  );
};

export default SideBar;
