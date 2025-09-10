import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentDashboard,
} from "../controllers/studentController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { requireAdmin, requireStudent } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin routes - Student management
router.get("/", verifyToken, requireAdmin, getAllStudents);
router.get("/:id", verifyToken, requireAdmin, getStudentById);
router.post("/", verifyToken, requireAdmin, createStudent);
router.put("/:id", verifyToken, requireAdmin, updateStudent);
router.delete("/:id", verifyToken, requireAdmin, deleteStudent);

// Student routes - Dashboard
router.get("/dashboard", verifyToken, requireStudent, getStudentDashboard);

export default router;
