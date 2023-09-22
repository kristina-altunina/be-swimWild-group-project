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
      console.log(err);
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

function postSwim(req, res, next) {
  const {
    date,
    locationName,
    locationId,
    notes,
    stars,
    recordTemp,
    feelTemp,
    mins,
    km,
    outOfDepth,
    shore,
    bankAngle,
    clarity,
    imgUrls,
  } = req.body;
  const uid = req.user.uid;
  const new_swim = {
    date,
    location: {
      name: locationName,
      id: locationId,
    },
    notes,
    stars,
    recordTemp,
    feelTemp,
    mins,
    km,
    outOfDepth,
    shore,
    bankAngle,
    clarity,
    imgUrls,
  };
  Users.updateOne({ uid: uid }, { $push: { swims: new_swim } })
    .then(() => {
      return Users.findOne({ uid: uid });
    })
    .then((user) => {
      console.log(user);
      const newSwim = user.swims[user.swims.length - 1];
      res.status(201).send(newSwim);
    })
    .catch(next);
}

function patchSwim(req, res, next) {
  const { id } = req.params;
  const uid = req.user.uid;
  const update = {};
  console.log(uid);
  console.log(id)

  console.log(req.body);
  Object.keys(req.body).forEach((key) => {
    if (key === "id" || key === "name") {
      update[`location.${key}`] = req.body[key];
    } else {
      update[key] = req.body[key];
    }
  });

  console.log(update)

  return Users.findOneAndUpdate(
    { uid: uid, "swims._id": id },
    { $set: update },
  ).then((updatedUser) => {
    console.log(updatedUser);
  });
}

module.exports = { postUser, getUser, patchUser, postSwim, patchSwim };
