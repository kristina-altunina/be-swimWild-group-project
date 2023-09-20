const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  removeUser
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
} = require("../controllers/validators/user-validators");

const usersRouter = require("express").Router();

usersRouter
  .route("/")
  .post(authoriseUser, postUser)
  .patch(authoriseUser, validateUserPatchBody, patchUser);

usersRouter.route("/profile")
.get(authoriseUser, getUser)
.delete(authoriseUser, removeUser);

module.exports = usersRouter;
