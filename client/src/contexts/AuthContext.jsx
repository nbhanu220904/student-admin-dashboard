import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../APIURL";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem("token");
            setToken(null);
          }
        } catch (error) {
          console.error("Auth initialization error:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      const endpoint =
        role === "admin" ? "/auth/admin/login" : "/auth/student/login";

      console.log(endpoint);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      //   console.log(response);

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const register = async (name, email, password, role, course) => {
    try {
      const endpoint =
        role === "admin" ? "/auth/admin/register" : "/auth/student/register";
      const body =
        role === "admin"
          ? { name, email, password }
          : { name, email, password, course };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_URL}/auth/student/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
