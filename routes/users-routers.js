const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  getUserById,
  removeUser,
  removeSwim,
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
} = require("../middleware/validators/user-validators");
const { validateSwimId } = require("../middleware/validators/swimId-validator");

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

usersRouter.route("/swims/:swimId").delete(authoriseUser, validateSwimId, removeSwim);

module.exports = usersRouter;
