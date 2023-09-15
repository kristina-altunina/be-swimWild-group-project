const mongoose = require("mongoose");
const { app } = require("./server");
require("dotenv").config();

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
