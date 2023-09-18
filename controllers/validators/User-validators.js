const isURL = require("is-url");

function validatePatchBody(req, res, next) {
  let isBad = false;
  const { nickname, profileImg } = req.body;

  //defening functions
  function CheckString(input) {
    if (typeof input !== "string") {
      return (isBad = true);
    }
  }
  function CheckURL(input) {
    if (!isURL(input)) {
      return (isBad = true);
    }
  }
  //Checking different cases
  if (nickname && profileImg) {
    CheckString(nickname);
    CheckURL(profileImg);
    if (isBad) {
      return next({ status: 400, msg: "incorrect body" });
    } else {
      next();
    }
  } else if (nickname) {
    CheckString(nickname);
    if (isBad) {
      return next({ status: 400, msg: "incorrect body" });
    } else {
      next();
    }

  } else if (profileImg) {
    CheckURL(profileImg);
    if (isBad) {
      return next({ status: 400, msg: "incorrect body" });
    } else {
      next();
    }
  }
  else{
    next({ status: 400, msg: "incorrect body" })
  }
}

module.exports = { validatePatchBody };
