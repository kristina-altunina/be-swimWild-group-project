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
  Users.create(newUser).then((newUser) => {
    res.status(200).send(newUser);
  });
}

function patchUser(req, res, next) {
  const { nickname, profileImg } = req.body;
  const filter = {uid: req.user.uid}
  const update = {}
  
  //functions that check request body is ok.
  function stopNonString(input) {
    if (typeof input !== "string") {
      return next({ status: 400, msg: "incorrectbody" });
    }
  }
  function stopNonURL(input) {
    const regex = /(https?:\/\/.*\.(?:png|jpg|svg))/;
    if (!regex.test(input)) {
      return next({ status: 400, msg: "incorrectbody" });
    }
  }
  
  //checking the request body. If request body is ok, then the "update" object is mutated appropriately.
  if (nickname && profileImg) {
    stopNonString(nickname);
    stopNonURL(profileImg);
    update.nickname = nickname
    update.profileImg = profileImg
  } else if (nickname) {
    stopNonString(nickname);
    update.nickname = nickname
  } else if (profileImg) {
    stopNonURL(profileImg);
    update.profileImg = profileImg
  } else {
    return next({ status: 400, msg: "incorrectbody" });
  }
  
  //Finding and mudating the correct Users Object
  Users.findOneAndUpdate(filter, update)
  //Finding the new Users Object
  .then(()=>{
    return Users.findOne(filter)
  })
  .then((newUser)=>{
    res.status(200).send(newUser)
  })
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
