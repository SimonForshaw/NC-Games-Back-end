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
      if (review.length === 0) {
        res.status(404).send({ msg: "Path not found" });
      }
      res.status(200).send(review[0]);
    })
    .catch(next);
};

console.log("In Controller!");
