const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

// routers
const usersRouter = require("./routes/users-routers");
const locationsRouter = require("./routes/locations-router");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/locations", locationsRouter);

app.use((err, req, res, next)=>{
  const {status, msg} = err
  console.log("middle")
  return res.status(status).send({msg})
})

module.exports = { app };
