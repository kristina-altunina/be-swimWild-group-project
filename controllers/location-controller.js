const Locations = require("../models/locations-model");
const Fuse = require("fuse.js");
const { processUserData } = require("./utils");

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
  function paginate(arr) {
    return arr.slice((p - 1) * limit, p * limit);
  }
  function addDistance(location) {
    const coords = location.loc.coordinates.map((coord) => +coord);
    const km = distanceBetweenCoords([lat, long], coords);
    const newLocation = location.toObject();
    newLocation.distanceKm = km;
    return newLocation;
  }
  const {
    lat = 52.77,
    long = -1.54,
    limit = 10,
    p = 1,
    filterName,
  } = req.query;
  Locations.find()
    .then((allLocations) => {
      const locations = allLocations
        .map(addDistance)
        .sort((a, b) => a.distanceKm - b.distanceKm);
      if (!filterName) return res.status(200).send(paginate(locations));
      const fuseOptions = {
        threshold: 0.6, //default is 0.6
        shouldSort: false, //defualt is true
        keys: ["name"],
      };
      const fuse = new Fuse(locations, fuseOptions);
      const filtered = fuse.search(filterName).map((place) => place.item);
      return res.status(200).send(paginate(filtered));
    })
    .catch(next);
}

function postLocation(req, res, next) {
  if (!req.body.name) {
    return res.status(400).send("Include a key of name on the request body");
  }
  if (!["lake", "pond", "river", "sea"].includes(req.body.type)) {
    return res.status(400).send("Include a key of type on the request body");
  }
  Locations.create(req.body).then((newLocation) => {
    return res.status(201).send(newLocation);
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
    const userData = processUserData(swims);
    // Locations.findOne({ _id: req.params.id }).then((location) => {});
    res.status(200).send({ swims, userData });
  });
}

module.exports = { getLocations, getLocationById };
