const { getLocations } = require("../controllers/location-controller");
const {
  validateCoordQueries,
} = require("../controllers/validators/coordinate-validator");
const {
  validatePaginationQueries,
} = require("../controllers/validators/pagination-validator");
const { authoriseUser } = require("../middleware/authoriseUser");

const locationsRouter = require("express").Router();

locationsRouter
  .route("/")
  .get(validatePaginationQueries, validateCoordQueries, getLocations);

module.exports = locationsRouter;
