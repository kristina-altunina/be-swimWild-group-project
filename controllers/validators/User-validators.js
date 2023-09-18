const isURL = require("is-url");

function validatePatchBody(req,res) {
  let isBad = false;
  console.log("here")
  const { nickname, profileImg } = req.body
  
  function CheckString(input) {
    if (typeof input !== "string") {
        isBad = true;
    }
  }
  function CheckURL(input) {
    if (!isURL(input)) {
        isBad = true;
    }
  }

  if (nickname && profileImg) {
    CheckString(nickname);
    CheckURL(profileImg);
    if(isBad){
        return next({status: 401, msg: "incorrect body"})
    }
  } else if (nickname) {
    CheckString(nickname);
    if(isBad){
        return next({status: 401, msg: "incorrect body"})
    }
  } else if (profileImg) {
    CheckURL(profileImg);
    if(isBad){
        return next({status: 401, msg: "incorrect body"})
    }
  } else {
    next()
  }
}

module.exports = {validatePatchBody}