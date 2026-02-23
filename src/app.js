const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  //creating new instance of User Model
  const user = new User({
    firstName: "Neha",
    lastName: "Siodiya",
    age: 28,
    gender: "female",
    email: "neha@test.com",
  });
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(404).send("Error saving user:", err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening at port 7777...");
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });
