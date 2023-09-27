function mongoDbErrors(err, req, res, next) {
  if (err?.code === 11000) {
    return res.status(400).send({ errorCode: 'duplicate-nickname', msg: "Nickname already in use" });
  }
  if (err._message) {
    return res.status(400).send(err._message);
  }
  next(err);
}

module.exports = { mongoDbErrors };
