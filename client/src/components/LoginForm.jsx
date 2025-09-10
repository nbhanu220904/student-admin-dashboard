import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const role = activeTab;
    const result = await login(email, password, role);

    if (result.success) {
      // Redirect based on role
      if (result.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } else {
      setErr(result.error);
    }

    setLoading(false);
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
                Student Login
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Hey, enter your details to sign in to your student account
              </p>

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
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Logging in..." : "Login as Student"}
                {/* Login as Student */}
              </button>
              {err && <p className="text-red-600 text-sm">{err}</p>}
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Admin Login
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Enter your admin credentials to manage the system
              </p>

              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                {loading ? "Logging in..." : "Login as Admin"}
              </button>
              {err && <p className="text-red-600 text-sm">{err}</p>}
            </form>
          )}

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
