const express = require("express");
const app = express();

const {  getCategories } = require("./controller");

app.use(express.json());

app.get("/api/categories", getCategories);

app.use((req, res, next) => {
  // console.log(res.status)
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  //console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

console.log("In app!");
module.exports = app;
