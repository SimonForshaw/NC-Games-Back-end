const express = require("express");
const app = express();

const { getStatus, getCategories } = require("./controller");

app.use(express.json());

app.get("/api", getStatus);
app.get("/api/categories", getCategories);

app.listen(9090, (err) => {
  if (err) console.log(err);
  else console.log("App listening on PORT 9090");
});

app.use((req, res, next) => {
  // console.log(res.status)
  res.status(404).send({ msg: "Path not found" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    // console.log(err.status)
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    //  console.log(err.status)
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    //  console.log(err.status)
    res.status(404).send({ msg: "Not found" });
  }
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error" });
});

console.log("In app!");
module.exports = app;
