import React from "react";
import { useAuth } from "../contexts/AuthContext";

const StudentProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="flex-1 justify-center items-center bg-white shadow-md rounded-lg p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-3">
        <div>
          <strong>Name:</strong> {user.name}
        </div>
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Course:</strong> {user.course || "Not updated"}
        </div>
        <div>
          <strong>Enrolled:</strong>{" "}
          {new Date(user.enrollmentDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
