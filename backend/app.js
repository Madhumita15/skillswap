const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./src/config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const userRoutes = require("./src/router/api/userRoutes");
const adminRoutes=require("./src/router/api/adminRoutes")

app.use("/api/skills", userRoutes);
app.use("/admin/api",adminRoutes);


const PORT = process.env.PORT || 3009;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});