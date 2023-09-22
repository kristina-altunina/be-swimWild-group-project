const Locations = require("../models/locations-model");
const Fuse = require("fuse.js");
const {
  processUserData,
  getSwimsFromLocation,
  addDistanceToLocation,
  addStarsToLocation,
  paginate,
} = require("../utils");
const { getApiData } = require("../api");

function getLocations(req, res, next) {
  const {
    lat = 52.77,
    long = -1.54,
    limit = 10,
    p = 1,
    filterName,
    sort_by = "proximity",
  } = req.query;
  Locations.find()
    .then((locations) => {
      locations = locations
        .map((location) => addDistanceToLocation(location, [lat, long]))
        .sort((a, b) => a.distanceKm - b.distanceKm);
      if (filterName) {
        const fuseOptions = {
          threshold: 0.6, //default is 0.6
          shouldSort: false, //defualt is true
          keys: ["name"],
        };
        const fuse = new Fuse(locations, fuseOptions);
        locations = fuse.search(filterName).map((place) => place.item);
      }
      const promises = [];
      locations.forEach((location) => {
        promises.push(addStarsToLocation(location));
      });
      return Promise.all(promises);
    })
    .then((locations) => {
      if (sort_by === "rating") {
        locations.sort((a, b) => {
          return b.avStars || 0 - a.avStars || 0;
        });
      }
      return res.status(200).send(paginate(locations, limit, p));
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
  let swims;
  let userData;
  let location;
  Locations.findOne({ _id: req.params.id })
    .then((locationData) => {
      if (!locationData) {
        return res.status(404).send("Location not found");
      }
      location = locationData;
      return getSwimsFromLocation(req.params.id);
    })
    .then((swimData) => {
      swims = swimData;
      userData = processUserData(swims);
      const day = +req.query.day || 0;
      const station = +req.query.station || 0;
      return getApiData(location.coords, location.type, day, station);
    })
    .then((apiData) => {
      res.status(200).send({ swims, userData, location, apiData });
    })
    .catch(next);
}

module.exports = { getLocations, getLocationById, postLocation };
