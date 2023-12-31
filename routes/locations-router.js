const {
  getLocations,
  postLocation,
  getLocationById,
} = require("../controllers/location-controller");
const {
  validateCoordQueries,
  validateCoordBody,
} = require("../middleware/validators/coordinate-validator");
const {
  checkLocationDistinct,
} = require("../middleware/validators/location.validators");
const {
  validatePaginationQueries,
} = require("../middleware/validators/pagination-validator");

const { authoriseUser } = require("../middleware/authoriseUser");

const locationsRouter = require("express").Router();

locationsRouter
  .route("/")
  .get(validatePaginationQueries, validateCoordQueries, getLocations)
  .post(authoriseUser, validateCoordBody, checkLocationDistinct, postLocation);

locationsRouter.route("/:id").get(getLocationById);

module.exports = locationsRouter;
