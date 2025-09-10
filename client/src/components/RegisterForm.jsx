import React, { useState } from "react";
import { API_URL } from "../APIURL";

const RegisterForm = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API_URL}/auth/student/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Registration failed");
      // auto‑login after sign‑up
      localStorage.setItem("studentLoginToken", json.token);
      // onSuccess?.();
      if (res.ok) window.location.href = "/student/dashboard";
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Section - Image */}
      <div className="w-1/2 h-full">
        <img
          src="/student-login.jpg"
          alt="Illustration"
          className="w-full h-100vh object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex items-center justify-center p-10 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex justify-around mb-6">
            <button
              className={`w-1/2 py-2 font-semibold rounded-l-xl ${
                activeTab === "student"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("student")}
            >
              Student
            </button>
            <button
              className={`w-1/2 py-2 font-semibold rounded-r-xl ${
                activeTab === "admin"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>

          {/* Form */}
          {activeTab === "student" ? (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                Student Registration
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Create your student account to access the platform
              </p>

              <input
                type="text"
                placeholder="Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Student ID / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Registering as Student ..." : "Register as Student"}
              </button>
              {err && <p className="text-red-600 text-sm">{err}</p>}
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Admin Registration
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Register an admin account to manage the system
              </p>

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                placeholder="Admin Username"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Register as Admin
              </button>
              {err && <p className="text-red-600 text-sm">{err}</p>}
            </>
          )}

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
