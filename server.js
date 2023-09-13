const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

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

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
