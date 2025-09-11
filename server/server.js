import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import passwordRequestRoutes from "./routes/passwordRequestRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware

const options = {
  origin: [
    'http://localhost:5173',
    'https://student-admin-dashboard-nu.vercel.app',
    process.env.client_url
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/student-admin-dashboard"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

// Routes
app.get("/", (_req, res) =>
  res.send("<h1>Welcome to the Student Admin Dashboard API</h1>")
);

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/password-requests", passwordRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
