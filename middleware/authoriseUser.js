const admin = require("firebase-admin");

const authoriseUser = (req, res, next) => {
  console.log("in the auth");
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .send({ msg: "This endpoint requires an authorization token" });
  }
  const token = authHeader.split(" ")[1];
  return admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      console.log("passed auth");
      req.user = user;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).send({ msg: "Unauthorized" });
    });
};

module.exports = { authoriseUser };
