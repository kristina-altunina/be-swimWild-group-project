const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const Locations = require("./models/locations-model");
const Users = require("./models/users-model");

require("dotenv").config();

const port = 3000;

app.use(express.json());

// const admin = require('../config/firebase-config');

app.use((req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((user) => {
      req.user = user;
      console.log("this is the value", user);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "Unauthorized" });
    });
});

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ greeting: `hello ${req.user.email}` });
});

// app.post("/locations", (req, res) => {
//   Locations.create(req.body).then((location) => {
//     res.status(200).json(location);
//   });
// });

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
  Users.find({}),
    then((users) => {
      res.status(200).json(users);
    });
});

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
