const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Lakes = require("./models/lakes-model")
require("dotenv").config()

const port = 3000;


app.use(express.json())

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ greeting: "hello" });
});

app.post("/lake", (req, res) => {
 
  Lakes.create(req.body)
    .then((lake) => {
      res.status(200).json(lake);
      
    })
}) 

app.get("/lakes", (req, res) => {
  Lakes.find({})
    .then((lakes) => {
    res.status(200).json(lakes);
  })
})

app.get('/lakes/:id', (req, res) => {
  const { id } = req.params

  Lakes.find({ _id: id })
    .then((lake) => {
      console.log(lake);
      res.status(200).json(lake);
    }).catch((err) => {
      console.log(err);
  })
})


mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
  console.log("connected to mongoDB")
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}).catch(() => {
  console.log(err);
})
