const express = require("express");
const cors = require("cors");

const googleAuth = require("./Validation/googleAuthValidation");
const usersController = require("./Controllers/usersController");
const transactionsController = require("./Controllers/transactionsController");
const emailAuthController = require("./Controllers/emailAuthController");

require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://plan-your-wealth.vercel.app",
  "https://plan-your-wealth-api.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", cors());

app.use(express.json());

app.use("/auth", googleAuth);
app.use("/users", usersController);
app.use("/transactions", transactionsController);
app.use("/email", emailAuthController);

app.get("/", (req, res) => {
  res.send("Welcome to PlanYourWealth Server");
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`PlanYourWealth listening on port ${PORT}`);
});
