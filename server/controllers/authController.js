import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("JWT_SECRET not set in .env");

// Register Student
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Check if email already exists
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      course: course || "MERN Bootcamp",
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: student._id, role: "student" },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      message: "Student registered successfully",
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: "student",
        course: student.course,
        enrollmentDate: student.enrollmentDate,
      },
    });
  } catch (err) {
    console.error("Student registration error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    // Generate JWT token
    const token = jwt.sign({ userId: admin._id, role: "admin" }, secretKey, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("Admin registration error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Student
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student
    const student = await Student.findOne({ email });
    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: student._id, role: "student" },
      secretKey,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        role: "student",
        course: student.course,
        enrollmentDate: student.enrollmentDate,
      },
    });
  } catch (err) {
    console.error("Student login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: admin._id, role: "admin" }, secretKey, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "student",
        course: user.course,
        enrollmentDate: user.enrollmentDate,
      },
    });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update student profile
export const updateStudentProfile = async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const userId = req.user._id;

    // Check if email is being changed and if it already exists
    if (email && email !== req.user.email) {
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      userId,
      { name, email, course },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        role: "student",
        course: updatedStudent.course,
        enrollmentDate: updatedStudent.enrollmentDate,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
