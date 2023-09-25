const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  getUserById,
  removeUser,
  postSwim,
  patchSwim,
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
} = require("../middleware/validators/user-validators");

const {
  validateSwimDate,
  validateLocationDetails,
  validateImageUrl,
  validateBody,
  validatePostFields,
} = require("../controllers/validators/swim-validators");

const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .post(authoriseUser, postUser)
  .patch(authoriseUser, validateUserPatchBody, patchUser);

usersRouter
  .route("/profile")
  .get(authoriseUser, getUser)
  .delete(authoriseUser, removeUser);

usersRouter.route("/:uid").get(getUserById);

usersRouter
  .route("/swim")
  .post(
    authoriseUser,
    validatePostFields,
    validateLocationDetails,
    validateSwimDate,
    validateImageUrl,
    postSwim
  );

usersRouter
  .route("/swim/:id")
  .patch(
    authoriseUser,
    validateLocationDetails,
    validateImageUrl,
    validateBody,
    patchSwim
  );

module.exports = usersRouter;
