import { auth } from "../../firebaseAdmin.js";

export const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .send({ error: "Email and new password are required" });
  }

  try {
    // Verify the user exists in Firebase
    const user = await auth.getUserByEmail(email);

    // Update the user's password
    await auth.updateUser(user.uid, { password: newPassword });

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    if (error.code === "auth/user-not-found") {
      res.status(404).send({ error: "User not found" });
    } else {
      res.status(500).send({ error: "Failed to update password" });
    }
  }
};
