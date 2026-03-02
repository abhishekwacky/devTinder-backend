const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

//POST - user to the database
app.post("/signup", async (req, res) => {
  // creating new instance of User Model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(404).send("Error saving user:", err.message);
  }
});

//GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    console.log(userEmail);
    const user = await User.findOne({ email: userEmail });
    res.send(user);
    // const user = await User.find({ email: userEmail });
    // if (user.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //     res.send(user);
    // }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//Delete user by id
app.delete("/user", async (req, res) => {
  const userid = req.body.id;
  try {
    const user = await User.findByIdAndDelete(userid);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

//Feed API - GET/feed - get all the users from database
app.get("/feed", (req, res) => {});

//Update data of the user
app.patch("/user", async (req, res) => {
  const userid = req.body.id;
  const data = req.body;
  console.log(data);
  try {
    await User.findByIdAndUpdate({ _id: userid }, data);
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
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
