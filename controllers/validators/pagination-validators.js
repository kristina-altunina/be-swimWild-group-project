function validatePaginationQueries(req, res, next) {
  const { p, limit } = req.query;
  if (p && (!/^[0-9]+$/.test(p) || +p < 1)) {
    return res
      .status(400)
      .send("page query must be a number and greater than 0");
  }
  if (limit && (!/^[0-9]+$/.test(limit) || +limit < 1)) {
    return res
      .status(400)
      .send("limit query must be a number and greater than 0");
  }
  next();
}

module.exports = { validatePaginationQueries };
