function validateCoordQueries(req, res, next) {
  const { lat, long } = req.query;
  return validateCoords(lat, long, res, next);
}

function validateCoordBody(req, res, next) {
  if (!req.body.coords) return next();
  const [lat, long] = req.body.coords;
  return validateCoords(lat, long, res, next);
}

function validateCoords(lat = 1, long = 1, res, next) {
  if (!/^[0-9.-]+$/.test(lat) || Math.abs(+lat) > 90) {
    return res
      .status(400)
      .send("latittude must be a float between -90 and 90 deg");
  }
  if (!/^[0-9.-]+$/.test(long) || Math.abs(long) > 180) {
    return res
      .status(400)
      .send("longitude must be a float between -180 and 180 deg");
  }
  return next();
}

module.exports = { validateCoordQueries, validateCoordBody };
