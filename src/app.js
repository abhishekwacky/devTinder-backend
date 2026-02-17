const express = require("express");

const app = express();

// app.get("/hello", (req, res) => {
//   res.send("Hello hello hello");
// });

app.use("/user", (req, res) => {
  res.send("HAHAHAHAHAHAHA");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Abhishek", lastName: "Kumar" });
});

app.post("/user", (req, res) => {
  console.log("Send data to the database");
  res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully ");
});

app.use("/test", (req, res) => {
  res.send("Hello from server");
});

// app.get("/", (req, res) => {
//   res.send("Namaste from dashboard!");
// });

app.listen(7777, () => {
  console.log("Server is successfully listening at port 7777...");
});
