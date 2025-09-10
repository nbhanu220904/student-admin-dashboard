import express from "express";
import {
  registerStudent,
  registerAdmin,
  loginStudent,
  loginAdmin,
  getCurrentUser,
  updateStudentProfile,
} from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Public routes
router.post("/student/register", registerStudent);
router.post("/admin/register", registerAdmin);
router.post("/student/login", loginStudent);
router.post("/admin/login", loginAdmin);

// Protected routes
router.get("/me", verifyToken, getCurrentUser);
router.put("/student/update", verifyToken, updateStudentProfile);

export default router;
