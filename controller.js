const {
  fetchCategories,
  fetchReviewsById,
  fetchReviews,
  fetchCommentsByReviewsId,
} = require("./model");
const fetchEndpoints = require("./endpoints.json");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categoriesArray) => {
      res.status(200).send({ categories: categoriesArray });
    })
    .catch(next);
};

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints: fetchEndpoints });
};

exports.getReviewsById = (req, res, next) => {
  const inputId = req.params.review_id;
  fetchReviewsById(inputId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviewsAarray) => {
      res.status(200).send({ reviews: reviewsAarray });
    })
    .catch(next);
};

exports.getCommentsByReviewsId = (req, res, next) => {
  const inputId = req.params.review_id;
  fetchCommentsByReviewsId(inputId)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

console.log("In Controller!");
