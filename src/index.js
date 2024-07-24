import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import otpRoutes from "./routes/otpRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import servicesRoutes from "./routes/serivcesRoutes.js";
import e from "express";
// import { isAuthenticated } from "./middleware/auth.js";

dotenv.config();

const app = e();
const port = parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "0.0.0.0";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running correctly" });
});

// OTP routes
app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);

// Appointment routes
app.use("/api/appointments", appointmentRoutes);

//Services routes
app.use("/api/services", servicesRoutes);

// Protected routes
// app.use("/api", isAuthenticated);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
      console.log(`For local access, use: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

export default app;
