import express from "express";
import { getStudentDashboard } from "../controllers/studentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/student/register", registerStudent);
// router.post("/student/login", loginStudent);
router.get("/student/dashboard", verifyToken, getStudentDashboard);

export default router;
