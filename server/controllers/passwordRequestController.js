import bcrypt from "bcrypt";
import PasswordRequest from "../models/passwordRequestModel.js";
import Student from "../models/studentModel.js";

// Student requests password change
export const requestPasswordChange = async (req, res) => {
  try {
    const { newPassword, reason } = req.body;
    const studentId = req.user._id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Create password change request
    const passwordRequest = await PasswordRequest.create({
      studentId,
      studentName: req.user.name,
      studentEmail: req.user.email,
      newPassword: hashedPassword,
      reason: reason || "Password change requested",
    });

    res.status(201).json({
      message: "Password change request submitted successfully. Please wait for admin approval.",
      requestId: passwordRequest._id,
    });
  } catch (err) {
    console.error("Password change request error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin gets all password change requests
export const getAllPasswordRequests = async (req, res) => {
  try {
    const requests = await PasswordRequest.find()
      .sort({ requestedAt: -1 })
      .populate("studentId", "name email course");

    res.json({
      message: "Password change requests retrieved successfully",
      requests,
    });
  } catch (err) {
    console.error("Get password requests error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin approves password change request
export const approvePasswordRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const adminId = req.user._id;
    const adminName = req.user.name;

    const request = await PasswordRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Password change request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request has already been processed" });
    }

    // Update student password
    await Student.findByIdAndUpdate(request.studentId, {
      password: request.newPassword,
    });

    // Update request status
    await PasswordRequest.findByIdAndUpdate(requestId, {
      status: "approved",
      adminId,
      adminName,
      processedAt: new Date(),
    });

    res.json({
      message: "Password change request approved successfully",
    });
  } catch (err) {
    console.error("Approve password request error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Admin rejects password change request
export const rejectPasswordRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { reason } = req.body;
    const adminId = req.user._id;
    const adminName = req.user.name;

    const request = await PasswordRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Password change request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Request has already been processed" });
    }

    // Update request status
    await PasswordRequest.findByIdAndUpdate(requestId, {
      status: "rejected",
      adminId,
      adminName,
      reason: reason || "Request rejected by admin",
      processedAt: new Date(),
    });

    res.json({
      message: "Password change request rejected",
    });
  } catch (err) {
    console.error("Reject password request error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Student gets their password change requests
export const getStudentPasswordRequests = async (req, res) => {
  try {
    const studentId = req.user._id;

    const requests = await PasswordRequest.find({ studentId })
      .sort({ requestedAt: -1 })
      .select("-newPassword"); // Don't return the hashed password

    res.json({
      message: "Password change requests retrieved successfully",
      requests,
    });
  } catch (err) {
    console.error("Get student password requests error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
