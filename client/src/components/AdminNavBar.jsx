import React from "react";

const AdminNavBar = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/admin/users" className="hover:underline">
              Users
            </a>
          </li>
          <li>
            <a href="/admin/settings" className="hover:underline">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavBar;
