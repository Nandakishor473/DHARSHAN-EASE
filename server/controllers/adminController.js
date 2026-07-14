const User = require("../models/User");
const Temple = require("../models/Temple");
const Slot = require("../models/DarshanSlot");
const Booking = require("../models/Booking");
const Donation = require("../models/Donation");

const dashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();
    const totalTemples = await Temple.countDocuments();
    const totalSlots = await Slot.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalDonations = await Donation.countDocuments();

    const donationAmount = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalTemples,
        totalSlots,
        totalBookings,
        totalDonations,
        totalDonationAmount:
          donationAmount.length > 0 ? donationAmount[0].total : 0
      }

    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};

module.exports = {
  dashboard
};