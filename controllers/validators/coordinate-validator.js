function validateCoordQueries(req, res, next) {
  const { lat, long } = req.query;
  if (lat && (!/^[0-9.-]+$/.test(lat) || Math.abs(+lat) > 90)) {
    return res
      .status(400)
      .send("latittude query must be a float between -90 and 90 deg");
  }
  if (long && (!/^[0-9.-]+$/.test(long) || Math.abs(long) > 180)) {
    return res
      .status(400)
      .send("longitude query must be a float between -180 and 180 deg");
  }
  next();
}

module.exports = { validateCoordQueries };
