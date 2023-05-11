const db = require("./db/connection");
const format = require("pg-format");
const testData = require("./db/data/test-data/index");
const { query } = require("./db/connection");

exports.fetchCategories = () => {
  const queryString = `SELECT * FROM categories;`;
  return db.query(queryString).then((categories) => {
    return categories.rows;
  });
};

exports.fetchReviewsById = (inputId) => {
  const queryString = `SELECT * FROM reviews WHERE review_id = $1;`;
  return db.query(queryString, [inputId]).then((reviewsById) => {
    if (reviewsById.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    } else {
      return reviewsById.rows[0];
    }
  });
};

console.log("In model!");
