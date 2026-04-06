const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

//POST - user to the database
app.post("/signup", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("hashpwd", passwordHash);

    // creating new instance of User Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

//Login - validate user to login into our application

app.post("/login", async (req, res) => {
  try {
    console.log("Login handler called!");
    console.log("req.body:", req.body);
    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email: email });
    console.log("Fetched user:", user);

    if (!user) {
      throw new Error("Invalid Credentials!!!");
    }
    if (!password) {
      throw new Error("Invalid Credentials!!!");
    }
    if (!user.password) {
      throw new Error("Password not set for this user");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful");
    } else {
      throw new Error("Password is not correct");
    }
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userid = req.params?.userId;
  const data = req.body;
  console.log("Hello", req.body);

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userid }, data, {});
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
