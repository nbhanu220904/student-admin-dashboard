// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />

          {/* Student Routes */}
          <Route
            path="/student/dashboard/*"
            element={
              <ProtectedRoute requiredRole="student">
                <ErrorBoundary>
                  <StudentDashboard />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <ErrorBoundary>
                  <AdminDashboard />
                </ErrorBoundary>
              </ProtectedRoute>
            }
          />

          {/* Unauthorized Route */}
          <Route
            path="/unauthorized"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Access Denied
                  </h1>
                  <p className="text-gray-600 mb-4">
                    You don't have permission to access this page.
                  </p>
                  <a href="/login" className="text-blue-600 hover:underline">
                    Go to Login
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
