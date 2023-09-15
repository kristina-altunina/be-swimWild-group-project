const { authoriseUser } = require("../middleware/authoriseUser");
const { postUser } = require("../controllers/user-controller");

const usersRouter = require("express").Router();

usersRouter.route("/").post(authoriseUser, postUser);

module.exports = usersRouter;
