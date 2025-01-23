const express = require("express");
const cors = require("cors");

const usersController = require("./Controllers/usersController");
const googleAuth = require("./Validation/googleAuthValidation");

require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://react-calculator-frontend.vercel.app",
  "https://react-calculator-backend.vercel.app",
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
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", cors());

app.use(express.json());

app.use("/auth", googleAuth);
app.use("/users", usersController);

app.get("/", (req, res) => {
  res.send("Welcome to React Calculator App's Server");
});

app.get("*", (req, res) => {
  res.status(404).send("404 Not Found!");
});

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`PlanYourWealth listening on port ${PORT}`);
});
