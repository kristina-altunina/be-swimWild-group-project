const { authoriseUser } = require("../middleware/authoriseUser");

const locationsRouter = require("express").Router();

locationsRouter.route("/").get((req, res) => {
  res.send("hi");
});

module.exports = locationsRouter;
