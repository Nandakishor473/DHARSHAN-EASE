const express=require("express");

const router=express.Router();

const {
    getSlots,
    getSlotsByTemple,
    getSlot,
    createSlot,
    updateSlot,
    deleteSlot,
  } = require("../controllers/slotController");

router.get("/",getSlots);
router.get("/temple/:templeId", getSlotsByTemple);
router.post("/",createSlot);
router.get("/:id", getSlot);

router.put("/:id", updateSlot);

router.delete("/:id", deleteSlot);

module.exports=router;