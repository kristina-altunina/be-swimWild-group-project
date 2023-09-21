const Locations = require("../../models/locations-model");
const isURL = require("is-url");

function validatePostSwimDate(req, res, next) {
  const { date } = req.body;

  const inputtedDate = new Date(date);

  const now = new Date();

  if (inputtedDate > now) {
    return res.status(400).send({ msg: "Date is not valid." });
  }
  next();
}

function validateLocationDetails(req, res, next) {
  const { locationName, locationId } = req.body;
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

function validateImageUrl(req, res, next) {
  const { imgUrls } = req.body;

  if (imgUrls) {
    if (imgUrls.length !== 0) {
      imgUrls.forEach((url) => {
        if (!isURL(url)) {
          return res.status(400).send({ msg: "URL is not valid." });
        }
      });
    }
  }
  next();
}

module.exports = {
  validatePostSwimDate,
  validateLocationDetails,
  validateImageUrl,
};
