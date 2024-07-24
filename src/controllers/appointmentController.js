import Appointment from "../models/Appointments.js";

export const addAppointment = async (req, res) => {
  const { clientName, phoneNumber, email, service, date, time, note, gender } =
    req.body;

  try {
    const newAppointment = new Appointment({
      clientName,
      phoneNumber,
      email,
      service,
      date,
      time,
      note,
      gender,
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to add appointment" });
  }
};

// Function to get appointment count
export const getAppointmentCount = async (req, res) => {
  try {
    const count = await Appointment.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching appointment count:", error);
    res.status(500).json({ error: "Failed to get appointment count" });
  }
};

// Function to get appointment count by gender
export const getAppointmentCountByGender = async (req, res) => {
  try {
    // Aggregate appointments by gender
    const countByGender = await Appointment.aggregate([
      { $group: { _id: "$gender", count: { $sum: 1 } } },
    ]);
    res.status(200).json(countByGender);
  } catch (error) {
    console.error("Error fetching appointment count by gender:", error);
    res
      .status(500)
      .json({ error: "Failed to get appointment count by gender" });
  }
};
