const Locations = require("../../models/locations-model");

function validatePostSwimDate(req, res, next) {
  const { date } = req.body;
  // if (!date) {
  //   return res.status(400).send({ msg: "No date provided" });
  // }

  const inputtedDate = new Date(date);

  const now = new Date();

  if (inputtedDate > now) {
    return res.status(400).send({ msg: "Date is not valid." });
  }
  next();
}

function validateLocationDetails(req, res, next) {
  const { locationName, locationId } = req.body;

  if (!locationName) {
    return res.status(400).send({ msg: "Location name is not provided." });
  }

  if (!locationId) {
    return res.status(400).send({ msg: "Location Id is not provided." });
  }

  return Locations.findOne({ name: locationName }).then((location) => {
    if (!location) {
      return res.status(400).send({ msg: "Location name is not valid." });
    }
    if (location._id.toString() !== locationId) {
      return res.status(400).send({ msg: "Location ID is not valid." });
    }
    next();
  });
}

module.exports = { validatePostSwimDate, validateLocationDetails };
