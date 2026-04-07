const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

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
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials!!!");
    }
    if (!user.password) {
      throw new Error("Password not set for this user");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //Create a JWT Token
      // const token = await jwt.sign({ _id: user._id }, "DEV@tinder123", {
      //   expiresIn: "1d",
      // });

      const token = await user.getJWT();

      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 360000),
      });
      res.send("Login Successful");
    } else {
      throw new Error("Invalid Credentials!!!");
    }
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

//Fetch User Profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

//Sending Connection Request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending the connection request");
  res.send("Connect Request Sent!!!");
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
