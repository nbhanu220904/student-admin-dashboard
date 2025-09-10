// controllers/userController.js   (ES‑module)
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/studentModel.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error("JWT_SECRET not set in .env");

export const registerStudent = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (await Student.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await Student.create({ username, email, password: hashed });

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered",
      token,
      user: { id: user._id, username, email },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login success",
      token,
      user: { id: user._id, username: user.username, email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
