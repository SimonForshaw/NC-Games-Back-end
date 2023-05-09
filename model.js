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

console.log("In model!");
