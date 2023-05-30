const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());

const {
  getCategories,
  getEndpoints,
  getReviewsById,
  getReviews,
  getCommentsByReviewsId,
  postCommentsByReviewId,
  patchReviewVotes,
  deleteCommentById,
} = require("./controller");

app.get("/api/categories", getCategories);

app.get("/api", getEndpoints);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewsById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewsId);

app.post("/api/reviews/:review_id/comments", postCommentsByReviewId);

app.patch("/api/reviews/:review_id", patchReviewVotes);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.use((req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Server Error" });
});

module.exports = app;
