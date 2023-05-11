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
  const queryString = `SELECT * FROM reviews WHERE review_id = ${inputId};`;
  return db.query(queryString).then((reviewsById) => {
    return reviewsById.rows;
  });
};

console.log("In model!");
