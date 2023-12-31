const Locations = require("../../models/locations-model");
const { distanceBetweenCoords } = require("../../utils");

function checkLocationDistinct(req, res, next) {
  const { coords } = req.body;
  if (!coords?.length) {
    return res
      .status(400)
      .send("Must include coordinates as array of [lat, long]!");
  }
  Locations.find({}).then((locations) => {
    for (const location of locations) {
      const proximity = distanceBetweenCoords(location.coords, coords);
      if (proximity < 1) {
        return res.status(400).send(`${location.name} has similar coordinates`);
      }
    }
    return next();
  });
}

module.exports = { checkLocationDistinct };
