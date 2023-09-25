const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  getUserById,
  removeUser,
  removeSwim,
  postSwim,
  patchSwim,
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
  validatePostBody,
} = require("../middleware/validators/user-validators");
const { validateSwimId } = require("../middleware/validators/swimId-validator");

const {
  validateSwimDate,
  validateLocationDetails,
  validateImageUrl,
  validateBody,
  validatePostFields,
} = require("../middleware/validators/swim-validators");

const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .post(authoriseUser, validatePostBody, postUser)
  .patch(authoriseUser, validateUserPatchBody, patchUser);

usersRouter
  .route("/profile")
  .get(authoriseUser, getUser)
  .delete(authoriseUser, removeUser);

usersRouter.route("/:uid").get(getUserById);

usersRouter
  .route("/swims/:swimId")
  .delete(authoriseUser, validateSwimId, removeSwim);

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
