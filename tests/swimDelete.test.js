const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");
const Users = require("../models/users-model");

const { refreshDocuments } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");
const Locations = require("../models/locations-model");

require("dotenv").config();

let accessToken;
let registeredAccessToken;
let swimId = "";
let rydalId = "";
let margateId = "";
let beckenhamId = "";
let goldigginsId = "";

beforeAll(() => {
  const promises = [];
  mongoose.set("runValidators", true);
  promises.push(
    mongoose.connect(process.env.DATABASE_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  );
  promises.push(
    getAccessTokens().then(([unregisteredToken, registeredToken, swimRegisteredToken]) => {
      console.log(unregisteredToken, registeredToken);
      accessToken = unregisteredToken;
      registeredAccessToken = registeredToken,
      swimRegisteredToken = swimRegisteredToken;
    })
  );
  return Promise.all(promises);
});

beforeEach(() => {
  return refreshDocuments(locations, users)
  .then(() => {
    const promises = [];
    promises.push(Locations.findOne({ name: "Rydal, Lake District" }));
    promises.push(
      Locations.findOne({ name: "Walpole Bay Tidal Pool, Margate" })
    );
    promises.push(
      Locations.findOne({ name: "Beckenham Park Swimming Lake, London" })
    );
    promises.push(
      Locations.findOne({ name: "Goldiggins Quarry, Minions, Cornwall" })
    );
    return Promise.all(promises);
  })
  .then((resolvedPromises) => {
    rydalId = resolvedPromises[0].id;
    margateId = resolvedPromises[1].id;
    beckenhamId = resolvedPromises[2].id;
    goldigginsId = resolvedPromises[3].id;
  })
  .then(() => {
    return Users.find({ uid: "QyqF2JQjSEY6TOqDvdaSAd99WyA2" })
      .then((user) => {
        const date = new Date("2023-08-29T18:00:00.000Z");
        return user[0].swims.find((s) => s.date.getTime() === date.getTime());
      })
      .then((swim) => {
        swimId = swim._id.toString();
      });
  });
});

afterAll(() => {
  return mongoose.connection.close();
});




describe("DELETE /users/swims",()=>{
    test("",()=>{
        
    })
})