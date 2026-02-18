const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Abhishek", lastName: "Kumar" });
});

app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Abhishek", lastName: "Kumar" });
});

app.listen(7777, () => {
  console.log("Server is successfully listening at port 7777...");
});
