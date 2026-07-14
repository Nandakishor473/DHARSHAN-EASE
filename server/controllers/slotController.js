const Slot=require("../models/DarshanSlot");

const getSlots=async(req,res)=>{
try{

const slots=await Slot.find().populate("temple");

res.json({
success:true,
count:slots.length,
slots
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}
};
const getSlotsByTemple = async (req, res) => {
    try {
  
      const slots = await Slot.find({
        temple: req.params.templeId
      });
  
      res.status(200).json({
        success: true,
        count: slots.length,
        slots
      });
  
    } catch (err) {
  
      res.status(500).json({
        success: false,
        message: err.message
      });
  
    }
  };

const createSlot=async(req,res)=>{

try{

const slot=await Slot.create(req.body);

res.status(201).json({
success:true,
message:"Slot Created Successfully",
slot
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}

};
// Get Single Slot
const getSlot = async (req, res) => {

    try {
  
      const slot = await Slot.findById(req.params.id);
  
      if (!slot) {
  
        return res.status(404).json({
          success: false,
          message: "Slot not found",
        });
  
      }
  
      res.status(200).json({
        success: true,
        slot,
      });
  
    } catch (err) {
  
      res.status(500).json({
        success: false,
        message: err.message,
      });
  
    }
  
  };
// Update Slot
const updateSlot = async (req, res) => {

    try {
  
      const slot = await Slot.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
  
      if (!slot) {
  
        return res.status(404).json({
          success: false,
          message: "Slot not found",
        });
  
      }
  
      res.status(200).json({
        success: true,
        message: "Slot Updated",
        slot,
      });
  
    } catch (err) {
  
      res.status(500).json({
        success: false,
        message: err.message,
      });
  
    }
  
  };
  // Delete Slot
const deleteSlot = async (req, res) => {

    try {
  
      const slot = await Slot.findById(req.params.id);
  
      if (!slot) {
  
        return res.status(404).json({
          success: false,
          message: "Slot not found",
        });
  
      }
  
      await slot.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Slot Deleted",
      });
  
    } catch (err) {
  
      res.status(500).json({
        success: false,
        message: err.message,
      });
  
    }
  
  };
  module.exports = {
    getSlots,
    getSlotsByTemple,
    getSlot,
    createSlot,
    updateSlot,
    deleteSlot,
  };