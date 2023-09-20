const isURL = require("is-url");

function validateUserPatchBody(req, res, next) {
  const { nickname, profileImg } = req.body;
  if (!nickname && !profileImg) {
    return res.status(400).send({
      msg: "Please enter a nickname or profile image to update",
    });
  }
  if (nickname && typeof nickname !== "string") {
    return res.status(400).send({ msg: "Nickname should be a string" });
  }
  if (profileImg && !isURL(profileImg)) {
    return res.status(400).send({ msg: `${profileImg} is not a valid URL` });
  }
  next();
}

module.exports = { validateUserPatchBody };
