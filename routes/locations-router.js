const {
  getLocations,
  postLocation,
  getLocationById,
} = require("../controllers/location-controller");
const {
  validateCoordQueries,
  validateCoordBody,
} = require("../controllers/validators/coordinate-validator");
const {
  checkLocationDistinct,
} = require("../controllers/validators/location.validators");
const {
  validatePaginationQueries,
} = require("../controllers/validators/pagination-validator");

const { authoriseUser } = require("../middleware/authoriseUser");

const locationsRouter = require("express").Router();

locationsRouter
  .route("/")
  .get(validatePaginationQueries, validateCoordQueries, getLocations)
  .post(authoriseUser, validateCoordBody, checkLocationDistinct, postLocation);

locationsRouter.route("/:id").get(getLocationById);

module.exports = locationsRouter;
