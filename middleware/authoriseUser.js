const admin = require("firebase-admin");

const authoriseUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(401)
      .send({ msg: "This endpoint requires an authorization token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "Unauthorized" });
    });
};

module.exports = { authoriseUser };
