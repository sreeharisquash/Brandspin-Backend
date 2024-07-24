import express from "express";
import { updatePassword } from "../controllers/updatePasswordController.js";

const router = express.Router();

router.post("/update-password", updatePassword);

export default router;
