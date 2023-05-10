const { fetchCategories } = require("./model");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categoriesArray) => {
      res.status(200).send({ categories: categoriesArray });
    })
    .catch(next);
};
console.log("In Controller!");
