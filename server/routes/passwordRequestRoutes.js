import express from "express";
import {
  requestPasswordChange,
  getAllPasswordRequests,
  approvePasswordRequest,
  rejectPasswordRequest,
  getStudentPasswordRequests,
} from "../controllers/passwordRequestController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { requireAdmin, requireStudent } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Student routes
router.post("/request", verifyToken, requireStudent, requestPasswordChange);
router.get("/student", verifyToken, requireStudent, getStudentPasswordRequests);

// Admin routes
router.get("/", verifyToken, requireAdmin, getAllPasswordRequests);
router.put("/:requestId/approve", verifyToken, requireAdmin, approvePasswordRequest);
router.put("/:requestId/reject", verifyToken, requireAdmin, rejectPasswordRequest);

export default router;
