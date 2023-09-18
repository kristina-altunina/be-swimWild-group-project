const Locations = require("../models/locations-model");
const Users = require("../models/users-model");

function distanceBetweenCoords(coords1, coords2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coords1[0] - coords2[0]);
  const dLon = deg2rad(coords[1] - coords2[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(coords1[0])) *
      Math.cos(deg2rad(coords2[0])) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function getLocations(req, res, next) {
  const { radius, lat, long } = req.query;
  console.log(lat, long, radius);
  Locations.find({}).then((allLocations) => {
    const locationsInRadius = allLocations.filter((location) => {
      // find an npm package for distance between coordinates in metres?
      // use this instead
      // then paginate
      // use the npm package for
      return (
        distanceBetweenCoords([lat, long], [location.loc.coordinates]) < radius
      );
    });
    res.status(200).send(locationsInRadius);
  });
}

module.exports = { getLocations };
