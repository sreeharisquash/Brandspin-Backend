import { auth } from "../../firebaseAdmin.js";
import OTP from "../models/OTP.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendOtpEmail } from "../services/emailService.js";

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  console.log("Received email:", email);

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  try {
    // Verify the user exists in Firebase
    await auth.getUserByEmail(email);

    // Generate a random 6-digit OTP
    const otp = generateOtp();

    // Save OTP to database
    await OTP.create({ email, otp });

    // Send the OTP via email
    await sendOtpEmail(email, otp);

    console.log(`OTP for ${email}: ${otp}`);

    res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    if (error.code === "auth/user-not-found") {
      res.status(404).send({ error: "User not found" });
    } else {
      res.status(500).send({ error: "Failed to send OTP" });
    }
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send({ error: "Email and OTP are required" });
  }

  try {
    // Fetch the OTP from the database
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(404).send({ error: "OTP not found" });
    }

    // Check if the provided OTP matches the stored OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).send({ error: "Invalid OTP" });
    }

    // Clear the OTP after successful verification
    await OTP.deleteOne({ email });

    res.status(200).send({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send({ error: "Something went wrong" });
  }
};
