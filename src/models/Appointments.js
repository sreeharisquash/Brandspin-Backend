import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  note: { type: String },
  gender: { type: String },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
