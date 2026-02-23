const express = require("express");

const app = express();

app.get("/getUserData", (req, res) => {
  try {
    //logic of DB call and get the data
    throw new Error("acds");
    res.send("User Data sent");
  } catch (err) {
    res.status(500).send("Some error occured. Contact Support Team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!!!");
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening at port 7777...");
});

//it will keep on going to middleware to middleware till it reaches a function which actually sends the response back and that function is known as request handler and all the function that is goes through in between it is known as middleware
//Only job of express is to take the request and give the response back as soon as possible and it goes in order so to keep checking these functions because the main job of server is to respond back to the user
