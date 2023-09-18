const { authoriseUser } = require("../middleware/authoriseUser");
const { postUser, patchUser, getUser } = require("../controllers/user-controller");

const usersRouter = require("express").Router();

usersRouter.route("/")
.post(authoriseUser, postUser)
.patch(authoriseUser, patchUser)

usersRouter.route("/profile").get(authoriseUser, getUser);

module.exports = usersRouter;
