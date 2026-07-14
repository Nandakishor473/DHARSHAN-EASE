const Booking = require("../models/Booking");
const Slot = require("../models/DarshanSlot");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { temple, slot, numberOfPersons } = req.body;

    const user = req.body.user;

    const selectedSlot = await Slot.findById(slot);

    if (!selectedSlot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    if (selectedSlot.availableSeats < numberOfPersons) {
      return res.status(400).json({
        success: false,
        message: "Seats not available",
      });
    }

    selectedSlot.availableSeats -= numberOfPersons;
    await selectedSlot.save();

    const booking = await Booking.create({
      user,
      temple,
      slot,
      numberOfPersons,
      bookingReference: "BK" + Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      booking,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("temple")
      .populate("slot");

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get Bookings By User
const getUserBookings = async (req, res) => {
  try {

    const bookings = await Booking.find({
      user: req.params.userId
    })
      .populate("temple")
      .populate("slot");

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });

    }

    const slot = await Slot.findById(booking.slot);

    slot.availableSeats += booking.numberOfPersons;

    await slot.save();

    booking.bookingStatus = "Cancelled";

    await booking.save();

    res.json({
      success: true,
      message: "Booking Cancelled Successfully"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};
// Get Bookings By Temple
const getTempleBookings = async (req, res) => {

    try {
  
      const bookings = await Booking.find({
        temple: req.params.templeId
      })
        .populate("user")
        .populate("temple")
        .populate("slot");
  
      res.json({
        success: true,
        count: bookings.length,
        bookings
      });
  
    } catch (err) {
  
      res.status(500).json({
        success: false,
        message: err.message
      });
  
    }
  
  };

  module.exports = {
    createBooking,
    getBookings,
    getUserBookings,
    getTempleBookings,
    cancelBooking
  };