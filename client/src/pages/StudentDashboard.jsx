import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentNavBar from "../components/StudentNavBar";
import SideBar from "../components/SideBar";
import StudentProfile from "../components/StudentProfile";
import UpdateProfile from "../components/UpdateProfile";
import PasswordChangeRequest from "../components/PasswordChangeRequest";

const StudentDashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <StudentNavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 justify-center items-center">
          <Routes>
            <Route path="/" element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="password-change" element={<PasswordChangeRequest />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
