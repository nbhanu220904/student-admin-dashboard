import bcrypt from "bcrypt";
import Student from "../models/studentModel.js";

// Get all students (Admin only)
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}, { password: 0 }).sort({
      createdAt: -1,
    });
    res.json({
      message: "Students retrieved successfully",
      students,
    });
  } catch (err) {
    console.error("Get all students error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get single student by ID (Admin only)
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id, { password: 0 });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student retrieved successfully",
      student,
    });
  } catch (err) {
    console.error("Get student by ID error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create new student (Admin only)
export const createStudent = async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
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

    res.status(201).json({
      message: "Student created successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        enrollmentDate: student.enrollmentDate,
      },
    });
  } catch (err) {
    console.error("Create student error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update student (Admin only)
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    // Check if email is being changed and if it already exists
    if (email) {
      const existingStudent = await Student.findOne({
        email,
        _id: { $ne: id },
      });
      if (existingStudent) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, course },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Update student error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete student (Admin only)
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error("Delete student error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get student dashboard data
export const getStudentDashboard = async (req, res) => {
  try {
    const student = req.user;
    res.json({
      message: "Student dashboard data retrieved successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        course: student.course,
        enrollmentDate: student.enrollmentDate,
      },
    });
  } catch (err) {
    console.error("Get student dashboard error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
