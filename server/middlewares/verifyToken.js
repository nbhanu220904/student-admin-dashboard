import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization; // "Bearer <token>"
    if (!bearer) return res.status(401).json({ message: "No token provided" });

    const token = bearer.split(" ")[1];
    const { userId } = jwt.verify(token, secretKey);

    // Try to find user in User model first, then Student model
    let user = await User.findById(userId);
    if (!user) {
      user = await Student.findById(userId);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user for downstream
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
