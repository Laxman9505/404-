const express = require("express");
const router = express.Router();
const Parking = require("../models/Parkingareas");

router.post("/newparking", async (req, res) => {
  const {
    name,
    location,
    carSlot,
    bikeSlot,
    carPrice,
    bikePrice,
    coordinates,
  } = req.body;
  try {
    const parking = await new Parking({
      name,
      location,
      carSlot,
      bikeSlot,
      carPrice,
      bikePrice,
      coordinates,
    });
    await parking.save();
    res.json({ success: "parking slot created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/parking/:name", async function (req, res) {
  let regex = new RegExp(req.params.name, "i");
  const result = await Parking.find({
    $or: [{ name: regex }, { location: regex }],
  });
  res.json({
    success: result,
  });
});
module.exports = router;
