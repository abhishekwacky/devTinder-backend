const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

//Handle all middleware for GET,POST request...
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully!!!");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data sent");
});

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteUser", adminAuth, (req, res) => {
  res.send("Deleated a user");
});

app.listen(7777, () => {
  console.log("Server is successfully listening at port 7777...");
});

//it will keep on going to middleware to middleware till it reaches a function which actually sends the response back and that function is known as request handler and all the function that is goes through in between it is known as middleware
//Only job of express is to take the request and give the response back as soon as possible and it goes in order so to keep checking these functions because the main job of server is to respond back to the user
