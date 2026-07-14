const express = require("express");

const router = express.Router();

const {
    createBooking,
    getBookings,
    getUserBookings,
    getTempleBookings,
    cancelBooking,
  } = require("../controllers/bookingController");

router.get("/", getBookings);

router.get("/user/:userId", getUserBookings);

router.post("/", createBooking);
router.get("/temple/:templeId", getTempleBookings);
router.put("/cancel/:id", cancelBooking);

module.exports = router;