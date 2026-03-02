const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhishek:AmljxpnLj64nAoeX@cluster0.4lwwzo5.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
