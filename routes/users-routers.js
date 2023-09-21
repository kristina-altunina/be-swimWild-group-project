const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  postSwim
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
} = require("../controllers/validators/user-validators");

const {
  validatePostSwimDate,
  validateLocationDetails, validateImageUrl
} = require("../controllers/validators/swim-validators");

const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .post(authoriseUser, postUser)
  .patch(authoriseUser, validateUserPatchBody, patchUser)

usersRouter.route("/profile").get(authoriseUser, getUser);

usersRouter
  .route("/swim")
  .post(
    authoriseUser,
    validatePostSwimDate,
    validateLocationDetails,
    validateImageUrl, postSwim
  );


module.exports = usersRouter;
