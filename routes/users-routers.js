const { authoriseUser } = require("../middleware/authoriseUser");
const { postUser, patchUser } = require("../controllers/user-controller");

const usersRouter = require("express").Router();

usersRouter.route("/")
.post(authoriseUser, postUser)
.patch(authoriseUser, patchUser)

module.exports = usersRouter;
