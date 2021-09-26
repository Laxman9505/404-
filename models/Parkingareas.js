const mongoose = require("mongoose");
const { Schema } = mongoose;

const ParkingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  carSlot: {
    type: Number,
    required: true,
  },
  bikeSlot: {
    type: Number,
    required: true,
  },
  bikePrice: {
    type: Number,
    required: true,
  },
  carPrice: {
    type: Number,
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
});

const ParkingMOdel = mongoose.model("Paring-Areas", ParkingSchema);

module.exports = ParkingMOdel;
