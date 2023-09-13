const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
