const {
  getLocations,
  getLocationById,
} = require("../controllers/location-controller");
const {
  validateCoordQueries,
} = require("../controllers/validators/coordinate-validator");
const {
  validatePaginationQueries,
} = require("../controllers/validators/pagination-validator");

const locationsRouter = require("express").Router();

locationsRouter
  .route("/")
  .get(validatePaginationQueries, validateCoordQueries, getLocations);

locationsRouter.route("/:id").get(getLocationById);

module.exports = locationsRouter;
