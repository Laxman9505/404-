const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  vehicleNo: {
    type: Number,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
