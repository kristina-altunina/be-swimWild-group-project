const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
const serviceAccount = require("swimwild-c2ca7-firebase-adminsdk-yneo9-a17048c8f7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// const admin = require('../config/firebase-config');

app.use(
  decodeToken(req, res, next).then(() => {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = admin.auth().verifyIdToken(token);
      if (decodeValue) {
        console.log(decodeValue);
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      return res.json({ message: "Internal Error" });
    }
  })
);

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ greeting: "hello" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
