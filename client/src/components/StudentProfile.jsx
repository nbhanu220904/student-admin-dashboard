import React from "react";
import { useAuth } from "../contexts/AuthContext";

const StudentProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-gray-500 text-center mt-10">Loading profile...</p>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 shadow-md">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.course || "Student"}</p>

        {/* Profile details */}
        <div className="text-left space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Email:</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-600">Course:</span>
            <span className="text-gray-800">
              {user.course || "Not updated"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Enrolled:</span>
            <span className="text-gray-800">
              {new Date(user.enrollmentDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
