import express from "express";
import {
  addServices,
  getServicesCount,
} from "../controllers/serviceController.js";

const router = express.Router();

//Route to add new service
router.post("/addServices", addServices);
router.get("/count", getServicesCount);

export default router;
