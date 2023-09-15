const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_LOCAL_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Locations = require("./locations-model");
const locationData = require("../test-data/locations");

const Users = require("./users-model");
const userData = require("../test-data/users");
const { addIdToLocations } = require("./utils");

const deleteDB = () => {
  const promises = [];
  promises.push(Locations.collection.drop());
  promises.push(Users.collection.drop());
  return Promise.all(promises)
    .then(() => {
      return Promise.resolve();
    })
    .catch(() => {
      return Promise.resolve();
    });
};

const seedWithLogs = (locationData, userData) => {
  return deleteDB()
    .then(() => Locations.create(locationData))
    .then(() => {
      console.log("Locations seeded");
      return Locations.find({});
    })
    .then((data) => {
      return Users.create(addIdToLocations(data, userData));
    })
    .then(() => {
      console.log("Users seeded");
    })
    .catch((error) => {
      console.error("Error seeding data:", error);
    })
    .finally(() => {
      mongoose.connection.close();
    });
};

const testSeed = (locationData, userData) => {
  return deleteDB()
    .then(() => Locations.create(locationData))
    .then(() => Locations.find({}))
    .then((data) => {
      return Users.create(addIdToLocations(data, userData));
    });
};

module.exports = { testSeed, seedWithLogs };
