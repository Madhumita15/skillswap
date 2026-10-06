const express = require("express");
const app = express();
const router = require("./router/index");
const errorHandler = require("./middleware/errorHandeler.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigins = [
  process.env.FRONTEND_HOST,
  process.env.FRONTEND_URL,
  "http://localhost:3000",
].filter(Boolean);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errorHandler);

module.exports = app;
