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
    location,
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
      name: location.name,
      id: location.id,
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
      const newSwim = user.swims[user.swims.length - 1];
      res.status(201).send(newSwim);
    })
    .catch(next);
}

function patchSwim(req, res, next) {
  const { id } = req.params;
  const uid = req.user.uid;


  Users.findOne({ uid: uid })
  .then((user) => {
    let newUser = { ...user.toObject() };
    newUser.swims = newUser.swims.map((swim) => {
      if (swim._id.toString() !== id) return swim;
      for (const key in req.body) {
        swim[key] = req.body[key];
      }
      return swim;
    });
    return Users.updateOne({ uid: uid }, {$set: newUser})
  })
  .then(()=>{
    return Users.findOne({ uid: uid })
  })
    .then((updatedUser) => {
    const updatedSwimArr = updatedUser.swims.filter((swim)=>{
      return swim._id.toString() === id
    })
    const updatedSwim = updatedSwimArr[0]
    res.status(200).send(updatedSwim)
  });
}

module.exports = { postUser, getUser, patchUser, postSwim, patchSwim };
