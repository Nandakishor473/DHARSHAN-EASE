const Temple = require("../models/Temple");

// Get All Temples
const getTemples = async (req, res) => {
  try {
    const temples = await Temple.find();

    res.status(200).json({
      success: true,
      count: temples.length,
      temples,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Temple
const getTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    res.status(200).json({
      success: true,
      temple,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Temple
const addTemple = async (req, res) => {

    try {
  
      const image = req.file
        ? `/uploads/${req.file.filename}`
        : "";
  
      const temple = await Temple.create({
  
        templeName: req.body.templeName,
        description: req.body.description,
        location: req.body.location,
        state: req.body.state,
        district: req.body.district,
        image,
        openingTime: req.body.openingTime,
        closingTime: req.body.closingTime,
  
      });
  
      res.status(201).json({
  
        success: true,
        message: "Temple Added Successfully",
        temple,
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        success: false,
        message: error.message,
  
      });
  
    }
  
  };

// Update Temple
const updateTemple = async (req, res) => {

    try {
  
      const temple = await Temple.findById(req.params.id);
  
      if (!temple) {
  
        return res.status(404).json({
  
          success: false,
          message: "Temple not found",
  
        });
  
      }
  
      temple.templeName = req.body.templeName;
      temple.description = req.body.description;
      temple.location = req.body.location;
      temple.state = req.body.state;
      temple.district = req.body.district;
      temple.openingTime = req.body.openingTime;
      temple.closingTime = req.body.closingTime;
  
      if (req.file) {
  
        temple.image = `/uploads/${req.file.filename}`;
  
      }
  
      await temple.save();
  
      res.status(200).json({
  
        success: true,
        message: "Temple Updated Successfully",
        temple,
  
      });
  
    } catch (error) {
  
      res.status(500).json({
  
        success: false,
        message: error.message,
  
      });
  
    }
  
  };
// Delete Temple
const deleteTemple = async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);

    if (!temple) {
      return res.status(404).json({
        success: false,
        message: "Temple not found",
      });
    }

    await temple.deleteOne();

    res.status(200).json({
      success: true,
      message: "Temple Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTemples,
  getTemple,
  addTemple,
  updateTemple,
  deleteTemple,
};