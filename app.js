const express = require("express");
const app = express();

const { getCategories, getEndpoints, getReviewsById } = require("./controller");

app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api", getEndpoints);

app.get("/api/reviews/:review_id", getReviewsById);

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
