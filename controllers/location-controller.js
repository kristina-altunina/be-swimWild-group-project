const Locations = require("../models/locations-model");
const Users = require("../models/users-model");
const Fuse = require('fuse.js');
const { filter } = require("../test-data/locations");

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
  const { lat = 52.77, long = -1.54, limit = 10, p = 1, filterName } = req.query;
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
      if(filterName){
        const fuseOptions = {
          threshold: 0.5, //default is 0.6
          shouldSort: false, //defualt is true
          keys: [
            "name"
          ]
        };
        const fuse = new Fuse(locationsWithDistance, fuseOptions)

        const filteredArray = fuse.search(filterName)
        const filteredLocationsWithDistance = filteredArray.map((place)=>{
          return place.item
        })
        res.status(200).send(filteredLocationsWithDistance.slice((p - 1) * limit, p * limit))
      }
      else{
        res
      .status(200)
      .send(locationsWithDistance.slice((p - 1) * limit, p * limit));
      }
  });
}

module.exports = { getLocations };
