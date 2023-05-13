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

exports.fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.review_id, reviews.title, reviews.designer, reviews.owner, reviews.review_img_url,
      reviews.category, reviews.created_at, reviews.votes,
      COUNT(comments.review_id) AS comment_count FROM reviews
          LEFT JOIN comments ON reviews.review_id = comments.review_id
          GROUP BY reviews.review_id
          ORDER BY reviews.created_at DESC;`
    )
    .then((result) => {
      return result.rows;
    });
};

exports.fetchCommentsByReviewsId = (inputId) => {
  const queryString = `SELECT * FROM comments WHERE review_id = $1
  ORDER BY comments.created_at DESC;`;
  return db.query(queryString, [inputId]).then((commentsById) => {
    if (commentsById.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Path not found" });
    } else {
      return commentsById.rows;
    }
  });
};

console.log("In model!");
