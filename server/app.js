const templeRoutes = require("./routes/templeRoutes");
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const slotRoutes=require("./routes/slotRoutes");
const bookingRoutes=require("./routes/bookingRoutes");
const donationRoutes=require("./routes/donationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to DarshanEase Backend",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/slots",slotRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/donations",donationRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;