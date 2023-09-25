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
let swimIdOfWrongUser = "";
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
    getAccessTokens().then(
      ([unregisteredToken, registeredToken, swimRegisteredToken]) => {
        console.log(unregisteredToken, registeredToken);
        accessToken = unregisteredToken;
        (registeredAccessToken = registeredToken),
          (swimRegisteredToken = swimRegisteredToken);
      }
    )
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
      return Users.find({ uid: "UHaKMQx4MLbrELny74UYMyUBcOm2" })
        .then((user) => {
          const date = new Date("2023-06-21T17:00:00+0000");
          return user[0].swims.find((s) => s.date.getTime() === date.getTime());
        })
        .then((swim) => {
          swimId = swim._id.toString();
        });
    });
});

beforeEach(() => {
  return Users.find({ uid: "QyqF2JQjSEY6TOqDvdaSAd99WyA2" })
    .then((notTheTokenBearerUser) => {
      const date = new Date("2023-09-02T11:00:00+0000");
      return notTheTokenBearerUser[0].swims.find(
        (s) => s.date.getTime() === date.getTime()
      );
    })
    .then((swim) => {
      let swimIdOfWrongUser = swim._id.toString();
    });
});

afterAll(() => {
  return mongoose.connection.close();
});

describe("DELETE /users/swims", () => {
  test("Returns the updated swims array of that user", () => {
    return request(app)
      .delete(`/users/swims/${swimId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual([]);
      });
  });
  test("400 error when given invalidSwimID", () => {
    return request(app)
      .delete("/users/swims/33")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid swimId");
      });
  });
  test("404 error when given swimID associated with different user", () => {
    return request(app)
      .delete(`/users/swims/${swimIdOfWrongUser}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(404);
  });
});
