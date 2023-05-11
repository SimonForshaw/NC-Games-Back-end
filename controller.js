const { fetchCategories } = require("./model");
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

console.log("In Controller!");
