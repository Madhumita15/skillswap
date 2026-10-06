const express = require("express");
const app = express();
const router = require("./router/index");
const errorHandler = require("./middleware/errorHandeler.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errorHandler);

module.exports = app;
