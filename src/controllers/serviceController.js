import Services from "../models/Services.js";

export const addServices = async (req, res) => {
  const { serviceName, category, description, duration, price, status } =
    req.body;

  try {
    const newService = new Services({
      serviceName,
      category,
      description,
      duration,
      price,
      status,
    });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.log("Error creating service", error);
    res.status(500).json({ error: "Failed to add service" });
  }
};

export const getServicesCount = async (req, res) => {
  try {
    const count = await Services.countDocuments();
    res.status(201).json({ count });
  } catch (error) {
    console.error("Error fetching services document count");
    res.status(500).json({ error: "Failed to get services count" });
  }
};
