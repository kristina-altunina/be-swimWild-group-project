const Locations = require("./locations-model");
const Users = require("./users-model");

function addIdToLocations(locations, userData) {
  return userData.map((user) => {
    const swims = user.swims.map((swim) => {
      const locationID = locations.find((location) => {
        return location.name === swim.location.name;
      })._id;
      const newSwim = { ...swim };
      newSwim.location.id = locationID;
      return newSwim;
    });
    const newUser = { ...user };
    newUser.swims = swims;
    return newUser;
  });
}

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
    });
};

const seedWithoutLogs = (locationData, userData) => {
  return deleteDB()
    .then(() => Locations.create(locationData))
    .then(() => Locations.find({}))
    .then((data) => {
      return Users.create(addIdToLocations(data, userData));
    })
    .then(() => {
      return Locations.syncIndexes();
    })
    .then(() => {
      return Users.syncIndexes();
    });
};

const refreshDocuments = (locationData, userData) => {
  return Users.deleteMany({})
    .then(() => Locations.deleteMany({}))
    .then(() => Locations.create(locationData))
    .then(() => Locations.find({}))
    .then((data) => Users.create(addIdToLocations(data, userData)))
    .then(() => Locations.syncIndexes())
    .then(() => Users.syncIndexes());
};

module.exports = { seedWithoutLogs, seedWithLogs, refreshDocuments };
