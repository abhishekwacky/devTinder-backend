const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateMyProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error saving user: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateMyProfileData(req)) {
      throw new Error("Invalid Edit Request!!!");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    // res.send("Profile Updated successfully!!!");
    res.json({
      message: `${loggedInUser.firstName} you have updated the data successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("You can't edit the profile");
  }
});

module.exports = profileRouter;
