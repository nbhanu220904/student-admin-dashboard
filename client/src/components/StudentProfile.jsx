import React, { useEffect, useState } from "react";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/auth/student/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setStudent(data.student);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p>
        <strong>Name:</strong> {student?.username}
      </p>
      <p>
        <strong>Email:</strong> {student?.email}
      </p>
      <p>
        <strong>Course:</strong> {student?.course || "Not updated"}
      </p>
      <p>
        <strong>Enrolled:</strong> {student?.enrollmentDate?.slice(0, 10)}
      </p>
    </div>
  );
};

export default StudentProfile;
