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
  Users.create(newUser)
    .then((newUser) => {
      console.log(newUser);
      res.status(201).send(newUser);
    })
    .catch(next);
}

function patchUser(req, res, next) {
  const { nickname, profileImg } = req.body;
  const filter = { uid: req.user.uid };
  const update = { nickname: nickname, profileImg: profileImg };
  Users.findOneAndUpdate(filter, update)
    .then(() => {
      return Users.findOne(filter);
    })
    .then((newUser) => {
      res.status(200).send(newUser);
    })
    .catch((err) => {
      console.log("why here");
    });
}

function getUser(req, res, next) {
  Users.find({ uid: { $eq: req.user.uid } }).then((user) => {
    res.status(200).send({
      name: user[0].name,
      nickname: user[0].nickname,
      profileImg: user[0].profileImg,
      dob: user[0].dob,
      swims: user[0].swims,
    });
  });
}

module.exports = { postUser, getUser, patchUser };
