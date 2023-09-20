const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  getUserById,
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
} = require("../controllers/validators/user-validators");

const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .post(authoriseUser, postUser)
  .patch(authoriseUser, validateUserPatchBody, patchUser);

usersRouter.route("/profile").get(authoriseUser, getUser);

usersRouter.route("/:uid").get(getUserById);

module.exports = usersRouter;
