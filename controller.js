const { fetchCategories, fetchReviewsById } = require("./model");
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
      console.log(review, "< Controller review console log");
      res.status(200).send({ review });
    })
    .catch(next);
};

console.log("In Controller!");
