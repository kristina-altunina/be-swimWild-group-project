const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

const Locations = require("./models/locations-model");
const Users = require("./models/users-model");

require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ greeting: `hello ${req.user.email}` });
});

app.get("/locations", (req, res) => {
  Locations.find({}).then((locations) => {
    res.status(200).json(locations);
  });
});

app.get("/locations/:id", (req, res) => {
  const { id } = req.params;

  Locations.find({ id: id })
    .then((location) => {
      res.status(200).json(location);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/users", (req, res) => {
  Users.find({}).then((users) => {
    res.status(200).json(users);
  });
});

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(401)
      .send({ msg: "This endpoint requires an authorization token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      req.user = user;
      console.log("User info: ", user);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "Unauthorized" });
    });
});

app.get("/profile", (req, res) => {
  Users.find({ uid: req.user.uid }).then((user) => {
    res.status(200).json(user);
  });
});

// app.post("/locations", (req, res) => {
//   Locations.create(req.body).then((location) => {
//     res.status(200).json(location);
//   });
// });

const port = 3000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log(err);
  });
