const Locations = require("../models/locations-model");
const Fuse = require("fuse.js");
const Users = require("../models/users-model");
const { distanceBetweenCoords, processUserData } = require("../utils");
const { getApiData } = require("../api");

function getLocations(req, res, next) {
  function paginate(arr) {
    return arr.slice((p - 1) * limit, p * limit);
  }
  function addDistance(location) {
    const coords = location.coords.map((coord) => +coord);
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
  Locations.create(req.body)
    .then((newLocation) => {
      return res.status(201).send(newLocation);
    })
    .catch(next);
}

function getLocationById(req, res, next) {
  const swims = [];
  let userData;
  let location;
  Locations.findOne({ _id: req.params.id })
    .then((locationData) => {
      console.log(locationData);
      if (!locationData) {
        return res.status(404).send("Location not found");
      }
      location = locationData;
      return Users.find({ "swims.location.id": req.params.id });
    })
    .then((users) => {
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
              return newSwim;
            })
        );
      });
      swims.sort((a, b) => {
        return b.date - a.date;
      });
      userData = processUserData(swims);
      const day = +req.query.day || 0;
      return getApiData(location.coords, location.type, day);
    })
    .then((apiData) => {
      res.status(200).send({ swims, userData, location, apiData });
    })
    .catch(next);
}

module.exports = { getLocations, getLocationById, postLocation };
