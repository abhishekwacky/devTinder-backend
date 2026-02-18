const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1");
    next();
    // res.send("Route handler 1");
  },
  (req, res, next) => {
    console.log("Response 2");
    // res.send("Route handler 2");
    next();
  },
  [
    (req, res, next) => {
      console.log("Response 3");
      // res.send("Route handler 3");
      next();
    },
    (req, res, next) => {
      console.log("Response 4");
      res.send("Route handler 4");
    },
  ],
);

app.listen(7777, () => {
  console.log("Server is successfully listening at port 7777...");
});
