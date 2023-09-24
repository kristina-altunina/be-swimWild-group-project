const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");
const Users = require("../models/users-model");

const { refreshDocuments } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { getAccessTokens } = require("./access-token");

require("dotenv").config();

let accessToken;
let registeredAccessToken;

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
    getAccessTokens().then(([unregisteredToken, registeredToken]) => {
      console.log(unregisteredToken, registeredToken);
      accessToken = unregisteredToken;
      registeredAccessToken = registeredToken;
    })
  );
  return Promise.all(promises);
});

beforeEach(() => {
  return refreshDocuments(locations, users);
});

afterAll(() => {
  return mongoose.connection.close();
});


describe("DELETE /users/swims",()=>{
    test("",()=>{
        
    })
})