function mongoDbErrors(err, req, res, next) {
  if (err?.code === 11000) {
    return res.status(400).send(`${err.keyValue} is already taken!`);
  }
  if (err._message) {
    return res.status(400).send(err._message);
  }
  next(err);
}

module.exports = { mongoDbErrors };
