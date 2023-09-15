const { authoriseUser } = require("../middleware/authoriseUser");
const { postUser, getUser } = require("../controllers/user-controller");

const usersRouter = require("express").Router();

usersRouter.route("/").post(authoriseUser, postUser);
usersRouter.route("/profile").get(authoriseUser, getUser);

module.exports = usersRouter;
