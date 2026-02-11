const express = require("express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello hello hello");
});

app.get("/test", (req, res) => {
  res.send("Hello from server");
});

app.get("/", (req, res) => {
  res.send("Namaste from dashboard!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening at port 7777...");
});
