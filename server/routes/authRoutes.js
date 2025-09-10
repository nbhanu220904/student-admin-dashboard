import express from "express";
import {
  loginStudent,
  registerStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);

export default router;
