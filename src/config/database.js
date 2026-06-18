const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhishekwacky:B4jMuO49HMvqRclY@cluster0.4lwwzo5.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
