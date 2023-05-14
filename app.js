const express = require("express");
const app = express();

const {
  getCategories,
  getEndpoints,
  getReviewsById,
  getReviews,
  getCommentsByReviewsId,
} = require("./controller");

app.get("/api/categories", getCategories);

app.get("/api", getEndpoints);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewsId);

app.use((req, res, next) => {
  // console.log("Err Handler", res.status, "Operational");
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    // console.log(err.status, "Err Handler 1");
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    // console.log(err.status, "Err Handler 2");
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  // console.log(err, "Err Handler 3");
  res.status(500).send({ msg: "Server Error" });
});

console.log("In app!");
module.exports = app;
