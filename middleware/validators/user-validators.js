const isURL = require("is-url");

function validateUserPatchBody(req, res, next) {
  const patchBodyKeys = Object.keys(req.body);
  patchBodyKeys.forEach((key) => {
    if (!["nickname", "profileImg"].includes(key)) {
      return res.status(400).send({ msg: "invalid patch body" });
    }
  });
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

function validatePostBody(req, res, next) {
  console.log("in the validator");
  const { name, nickname, dob, profileImg, bio, home } = req.body;
  const postBodyKeys = Object.keys(req.body);
  for (const key of postBodyKeys) {
    if (
      !["name", "nickname", "profileImg", "dob", "bio", "home"].includes(key)
    ) {
      return res.status(400).send({ msg: "One of the given keys is invalid" });
    }
    if (nickname && typeof nickname !== "string") {
      return res.status(400).send({ msg: "Nickname should be a string" });
    }
    if (name && typeof name !== "string") {
      return res.status(400).send({ msg: "Nickname should be a string" });
    }
    if (profileImg && !isURL(profileImg)) {
      return res.status(400).send({ msg: `${profileImg} is not a valid URL` });
    }
    if (bio && typeof bio !== "string") {
      return res.status(400).send({ msg: "bio should be a string" });
    }
    if (home && typeof home !== "string") {
      return res.status(400).send({ msg: "bio should be a string" });
    }
    if (dob && typeof dob !== "string") {
      return res.status(400).send({ msg: "dob should be a string" });
    }
    console.log("passed auth");
    return next();
  }
}

module.exports = { validateUserPatchBody, validatePostBody };
