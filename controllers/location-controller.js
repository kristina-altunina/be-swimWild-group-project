const Locations = require("../models/locations-model");
const Users = require("../models/users-model");

function distanceBetweenCoords(coords1, coords2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coords1[0] - coords2[0]);
  const dLon = deg2rad(coords1[1] - coords2[1]);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(coords1[0])) *
      Math.cos(deg2rad(coords2[0])) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return +d.toFixed(2);
}

function getLocations(req, res, next) {
  const { lat = 52.77, long = -1.54, limit = 10, p = 1 } = req.query;
  Locations.find().then((allLocations) => {
    const locationsWithDistance = allLocations
      .map((location) => {
        const coords = location.loc.coordinates.map((coord) => +coord);
        const km = distanceBetweenCoords([lat, long], coords);
        const newLocation = location.toObject();
        newLocation.distanceKm = km;
        return newLocation;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
    res
      .status(200)
      .send(locationsWithDistance.slice((p - 1) * limit, p * limit));
  });
}

function getLocationById(req, res, next) {
  const swims = [];
  Users.find({ "swims.location.id": req.params.id }).then((users) => {
    users.forEach((user) => {
      swims.push(
        ...user.swims
          .filter((swim) => {
            return swim.location.id === req.params.id;
          })
          .map((swim) => {
            const newSwim = { ...swim.toObject() };
            newSwim.uid = user.uid;
            newSwim.name = user.name;
            newSwim.nickname = user.nickname;
            newSwim.profileImg = user.profileImg;
            newSwim.sizeKey = swim.sizeKey;
            newSwim.imgUrls = swim.imgUrls;
            return newSwim;
          })
      );
    });
    swims.sort((a, b) => {
      return b.date - a.date;
    });
    res.status(200).send({ swims });
  });
}

module.exports = { getLocations, getLocationById };
