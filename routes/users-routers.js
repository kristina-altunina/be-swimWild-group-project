const { authoriseUser } = require("../middleware/authoriseUser");
const {
  postUser,
  patchUser,
  getUser,
  postSwim,
  patchSwim
} = require("../controllers/user-controller");
const {
  validateUserPatchBody,
} = require("../controllers/validators/user-validators");

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

usersRouter.route("/profile").get(authoriseUser, getUser);




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

usersRouter.route("/swim/:id").patch(
  authoriseUser,
  validateLocationDetails,
  validateImageUrl,
  validateBody,
  patchSwim
);


module.exports = usersRouter;
