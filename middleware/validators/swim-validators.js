const Locations = require("../../models/locations-model");
const isURL = require("is-url");
const _ = require("lodash");

const isObjectEmpty = (objectName) => {
  return _.isEmpty(objectName);
};

function validateBody(req, res, next) {
  if (isObjectEmpty(req.body)) {
    return res.status(400).send({ msg: "Nothing to post" });
  }
  next();
}

function validateSwimDate(req, res, next) {
  const { date } = req.body;
  if (date) {
    const inputtedDate = new Date(date);
    const now = new Date();
    if (inputtedDate > now) {
      return res.status(400).send({ msg: "Date cannot be in the future" });
    }
  }
  next();
}

function validatePostFields(req, res, next) {
  const { location, date } = req.body;
  if (!date || !location) {
    return res
      .status(400)
      .send({ msg: "Please provide a date and a location" });
  }
  next();
}

function validateLocationDetails(req, res, next) {
  const { location } = req.body;
  if (location) {
    return Locations.findOne({ name: location.name }).then((locationDb) => {
      if (!locationDb) {
        return res
          .status(404)
          .send({ msg: "Location does not exist in database" });
      }
      if (locationDb._id.toString() !== location.id) {
        return res
          .status(400)
          .send({ msg: "Location ID does not match location name" });
      }
      return next();
    });
  }
  next();
}

function validateImageUrl(req, res, next) {
  const { imgUrls = [] } = req.body;
  if (imgUrls.length !== 0) {
    for (const url of imgUrls) {
      if (!isURL(url)) {
        return res.status(400).send({ msg: "URL is not valid" });
      }
    }
  }
  next();
}

module.exports = {
  validateSwimDate,
  validateLocationDetails,
  validateImageUrl,
  validateBody,
  validatePostFields,
};
