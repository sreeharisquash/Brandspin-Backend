import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  category: {
    type: String,
    enum: ["Haircut", "Treatments", "Nails", "Skincare"],
    required: true,
  },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

const Services = mongoose.model("Services", servicesSchema);

export default Services;
