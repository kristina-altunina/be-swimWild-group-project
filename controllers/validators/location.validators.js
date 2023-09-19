function checkLocationDistinct(req, res, next) {
  const { coords } = req.body;
  if (!coords) {
    return res
      .status(400)
      .send("Must include coordinates as array of [lat, long]!");
  }
}

module.exports = { checkLocationDistinct };
