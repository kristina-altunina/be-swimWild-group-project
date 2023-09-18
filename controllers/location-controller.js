const Locations = require("../models/locations-model");
const Users = require("../models/users-model");

function getLocations(req, res, next) {
  const { radius } = req.query;
  Locations.find({}).then((allLocations) => {
    const locationsInRadius = allLocations.filter((location) => {
      return;
    });
    res.status(200).send(allLocations);
  });
}

module.exports = { getLocations };
