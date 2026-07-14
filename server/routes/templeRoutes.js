const express = require("express");

const router = express.Router();

const {
  getTemples,
  getTemple,
  addTemple,
  updateTemple,
  deleteTemple,
} = require("../controllers/templeController");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/", getTemples);
router.get("/:id", getTemple);

// Admin Only
router.post("/", upload.single("image"), addTemple);
router.put("/:id", upload.single("image"), updateTemple);
router.delete("/:id", deleteTemple);

module.exports = router;