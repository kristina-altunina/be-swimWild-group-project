const { getLocations } = require("../controllers/location-controller");
const {
  validatePaginationQueries,
} = require("../controllers/validators/pagination-validators");
const { authoriseUser } = require("../middleware/authoriseUser");

const locationsRouter = require("express").Router();

locationsRouter.route("/").get(validatePaginationQueries, getLocations);

module.exports = locationsRouter;
