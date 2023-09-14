const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Lakes = require("./models/lakes-model");
const lakeData = require("./test-data/lakes");

const seedDB = (lakeData) => {
  return Lakes.collection
    .drop()
    .then(() => Lakes.create(lakeData))
    .then(() => {
      console.log("Lakes seeded");
    })
    .catch((error) => {
      console.error("Error seeding lakes:", error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

seedDB(lakeData);


