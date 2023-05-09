const { fetchCategories } = require("./model");

exports.getStatus = (req, res) => {
  res
    .status(200)
    .send({ msg: "Connection established" })
    .catch((err) => {
      console.log(err, "error in controller");
    });
};
exports.getCategories = (req, res, next) => {
  fetchCategories().then((categoriesArray) => {
    res.status(200).send({ categories: categoriesArray });
  });
};
console.log("In Controller!");
