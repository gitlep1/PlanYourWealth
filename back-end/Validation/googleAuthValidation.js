const express = require("express");
const googleAuth = express.Router();
const { OAuth2Client } = require("google-auth-library");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

googleAuth.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    console.log("User google authenticated:", { sub, email, name, picture });

    // Check if user in database or create a new user if not found

    res.status(200).json({
      message: "User google authenticated successfully",
      payload: { id: sub, email, name, picture },
    });
  } catch (error) {
    console.error("Error verifying google token:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = googleAuth;
