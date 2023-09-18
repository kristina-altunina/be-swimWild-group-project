const isURL = require("is-url");

function validatePatchBody(input) {
  let isCorrect = true;
  const { nickname, profileImg } = input;
  
  function stopNonString(input) {
    if (typeof input !== "string") {
      isCorrect = false;
    }
  }
  function stopNonURL(input) {
    if (!isURL(input)) {
      isCorrect = false;
    }
  }

  if (nickname && profileImg) {
    stopNonString(nickname);
    stopNonURL(profileImg);
    return isCorrect;
  } else if (nickname) {
    stopNonString(nickname);
    return isCorrect;
  } else if (profileImg) {
    stopNonURL(profileImg);
    return isCorrect;
  } else {
    return false
  }
}

module.exports = {validatePatchBody}