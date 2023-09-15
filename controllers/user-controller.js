const Locations = require("../models/locations-model");
const Users = require("../models/users-model");

function postUser(req, res, next) {
  const newUser = {
    uid: req.user.uid,
    name: req.body.name,
    nickname: req.body.nickname,
    dob: req.body.dob,
    profileImg: req.body.profileImg,
  };
  console.log(newUser);
  Users.create(newUser).then((newUser) => {
    res.status(200).send(newUser);
  });
}

function patchUser(req, res, next) {
  const { nickname, profileImg } = req.body;

  function stopNonString(input) {
    if (typeof input !== "string") {
      return next({ status: 400, msg: "incorrectbody" });
    }
  }
  function stopNonURL(input) {
    const regex = /(https?:\/\/.*\.(?:png|jpg))/;
    if (!regex.test(input)) {
      return next({ status: 400, msg: "incorrectbody" });
    }
  }

  if (nickname && profileImg) {
    stopNonString(nickname);
    stopNonURL(profileImg);
  } else if (nickname) {
    stopNonString(nickname);
  } else if (profileImg) {
    stopNonURL(profileImg);
  } else {
    return next({ status: 400, msg: "incorrectbody" });
  }
}

module.exports = { postUser, patchUser };

// app.get("/", (req, res) => {
//   res.status(200).send({ greeting: `hello ${req.user.email}` });
// });

// app.get("/locations", (req, res) => {
//   Locations.find({}).then((locations) => {
//     res.status(200).json(locations);
//   });
// });

// app.get("/locations/:id", (req, res) => {
//   const { id } = req.params;

//   Locations.find({ id: id })
//     .then((location) => {
//       res.status(200).json(location);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/users", (req, res) => {
//   Users.find({}).then((users) => {
//     res.status(200).json(users);
//   });
// });

// app.get("/profile", (req, res) => {
//   Users.find({ uid: req.user.uid }).then((user) => {
//     res.status(200).json(user);
//   });
// });

// app.post("/locations", (req, res) => {
//   Locations.create(req.body).then((location) => {
//     res.status(200).json(location);
//   });
// });
