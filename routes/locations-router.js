const { getLocations } = require("../controllers/location-controller");
const { authoriseUser } = require("../middleware/authoriseUser");

const locationsRouter = require("express").Router();

locationsRouter.route("/").get(getLocations);

module.exports = locationsRouter;
