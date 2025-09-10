// Role-based access control middleware
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const userRole = req.user.role || "student";

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

// Admin only middleware
export const requireAdmin = requireRole(["admin"]);

// Student only middleware
export const requireStudent = requireRole(["student"]);

// Admin or Student middleware
export const requireUser = requireRole(["admin", "student"]);
