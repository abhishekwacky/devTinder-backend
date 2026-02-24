const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhishek:AdnHFyix0OMs6izg@cluster0.4lwwzo5.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
