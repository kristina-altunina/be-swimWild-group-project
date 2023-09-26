const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

// routers
const usersRouter = require("./routes/users-routers");
const locationsRouter = require("./routes/locations-router");
const { mongoDbErrors } = require("./middleware/errorHandlers");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/locations", locationsRouter);

app.use(mongoDbErrors);

app.use((err, req, res, next) => {
  consoel.log(err);
  res.status(500).send("something has gone wrong here!");
});

module.exports = { app };
