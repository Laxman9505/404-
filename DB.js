const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("mongoDB connected successfully");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
