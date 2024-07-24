import {
  addAppointment,
  getAppointmentCount,
  getAppointmentCountByGender,
} from "../controllers/appointmentController.js";
import express from "express";

const router = express.Router();

// Route to add an appointment
router.post("/addAppointments", addAppointment);

// Route to get total appointment count
router.get("/count", getAppointmentCount);

// Route to get total appointment count by gender
router.get("/countByGender", getAppointmentCountByGender);

export default router;
