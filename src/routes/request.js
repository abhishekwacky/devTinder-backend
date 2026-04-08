const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending the connection request");
  res.send("Connect Request Sent!!!");
});

module.exports = requestRouter;
