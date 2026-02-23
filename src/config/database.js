const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhishek:rbkuVCTsDrHcCi6F@projectnodejs.2ncegrb.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
