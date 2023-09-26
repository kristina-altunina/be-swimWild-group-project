function mongoDbErrors(err, req, res, next) {
  console.log("in mongodb error handler", err);
  if (err?.code === 11000) {
    console.log("look 1");
    return res.status(400).send(`${err.keyValue} is already taken!`);
  }
  if (err._message) {
    console.log("look2");
    return res.status(400).send(err._message);
  }
  console.log("look 3");
  next(err);
}

module.exports = { mongoDbErrors };
