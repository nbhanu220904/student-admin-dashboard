const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
const { default: Student } = require("../models/studentModel");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization; // "Bearer <token>"
    if (!bearer) return res.status(401).json({ message: "No token provided" });

    const token = bearer.split(" ")[1];
    const { userId } = jwt.verify(token, secretKey);

    const user = await Student.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user for downstream
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
