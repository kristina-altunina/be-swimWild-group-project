const Users = require("../models/users-model");

function postUser(req, res, next) {
  const newUser = {
    uid: req.user.uid,
    name: req.body.name,
    nickname: req.body.nickname,
    dob: req.body.dob,
    profileImg: req.body.profileImg,
    bio: req.body.bio,
    home: req.body.home,
  };
  Users.create(newUser)
    .then((newUser) => {
      console.log(newUser);
      res.status(201).send(newUser);
    })
    .catch(next);
}

function patchUser(req, res, next) {
  const filter = { uid: req.user.uid };
  const update = {};
  for (const key in req.body) update[key] = req.body[key];
  Users.findOneAndUpdate(filter, update)
    .then(() => {
      return Users.findOne(filter);
    })
    .then((newUser) => {
      res.status(200).send(newUser);
    })
    .catch(next);
}

function getUser(req, res, next) {
  Users.findOne({ uid: { $eq: req.user.uid } })
    .then((user) => {
      res.status(200).send({
        name: user.name,
        nickname: user.nickname,
        profileImg: user.profileImg,
        dob: user.dob,
        swims: user.swims,
        bio: user.bio,
        home: user.home,
      });
    })
    .catch(next);
}

function removeUser(req, res, next) {
  Users.deleteOne({ uid: { $eq: req.user.uid } })
    .then(() => {
      return res.status(204).send();
    })
    .catch(next);
}

function getUserById(req, res, next) {
  const { uid } = req.params;
  Users.findOne({ uid: { $eq: uid } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "user not found" });
      } else {
        return res.status(200).send({
          name: user.name,
          nickname: user.nickname,
          profileImg: user.profileImg,
          dob: user.dob,
          swims: user.swims,
          bio: user.bio,
          home: user.home,
        });
      }
    })
    .catch(next);
}

function removeSwim(req, res, next){
  const { id } = req.params;
  const uid = req.user.uid;

  Users.findOne({ uid: uid })
  .then((user) => {
    let newUser = { ...user.toObject() };
    newUser.swims = newUser.swims.map((swim) => {
      console.log(swim._id.toString())
      if (swim._id.toString() !== id) return swim;
    });
    return Users.updateOne({ uid: uid }, {$set: newUser})
  })
  .then(()=>{
    return Users.findOne({ uid: uid })
  })
  .then((updatedUser)=>{
    const updatedSwimArr = updatedUser.swims
    res.status(200).send(updatedSwimArr)
  });

}

module.exports = { postUser, getUser, patchUser, getUserById, removeUser, removeSwim };
