const express = require("express");
const emailAuth = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const {
  createEmailVerification,
  getEmailVerification,
  deleteEmailVerification,
} = require("../Queries/emailAuthQueries");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

emailAuth.post("/send-verification", async (req, res) => {
  const { email } = req.body;

  try {
    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await createEmailVerification(email, code);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${code}. It expires in 5 minutes.`,
    });

    res.status(200).json({ message: "Verification code sent to your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send verification code." });
  }
});

emailAuth.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;

  try {
    const emailVerification = await getEmailVerification(email);

    if (!emailVerification) {
      return res.status(400).json({ message: "Invalid email or code." });
    }

    const { code: storedCode, created_at } = emailVerification;
    const expiresAt = new Date(new Date(created_at).getTime() + 5 * 60 * 1000);

    if (code !== storedCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    if (new Date() > expiresAt) {
      return res
        .status(400)
        .json({ message: "Verification code has expired." });
    }

    await deleteEmailVerification(email);

    res.status(200).json({ message: "Verification successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to verify the code." });
  }
});

module.exports = emailAuth;
