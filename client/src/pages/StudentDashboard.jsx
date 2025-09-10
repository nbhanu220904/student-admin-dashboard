import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentNavBar from "../components/StudentNavBar";
import StudentSideBar from "../components/SideBar";
import StudentProfile from "../components/StudentProfile";
import UpdateProfile from "../components/UpdateProfile";

const StudentDashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <StudentNavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <StudentSideBar />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Routes>
            <Route path="/" element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
