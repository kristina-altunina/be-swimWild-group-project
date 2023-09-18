const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { accessToken } = require("./access-token");

require("dotenv").config();

beforeAll(() => {
  return mongoose.connect(process.env.DATABASE_LOCAL_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(() => {
  return testSeed(locations, users);
});

afterAll(() => {
  // setTimeout(()=>{
    return mongoose.connection.close();
  // },500)
});

describe("GET /users/profile", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).get("/users/profile").expect(401);
  });
  test("should respond 200 if passed valid access token", () => {
    return request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });
  test("should respond with correct user information", () => {
    return request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${accessToken}`)
      .then(({ body }) => {
        expect(body).toMatchObject({
          name: "testUser",
          nickname: "tester",
          dob: "1997-09-02T11:00:00.000Z",
          profileImg: "http://lookatme.jpg",
          swims: [],
        });
      });
  });
});

describe("PATCH /users/", () => {
  test("should respond 401 Unauthorized when no access token provided", () => {
    return request(app).patch("/users").expect(401);
  });
  test.only("responds with correct user information when passed correcttly formated body", () => {
    const toUpdate = {
      nickname: "dobbyforRon",
      profileImg:
        "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
    };
    return request(app)
      .patch("/users")
      .send(toUpdate)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchObject({
          name: "testUser",
          nickname: "dobbyforRon",
          profileImg:
            "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
          dob: "1997-09-02T11:00:00.000Z",
          swims: [],
        });
      });
  });
  test("Should return 400 error when passed incorret body", () => {
    const toUpdateBad = {
      nickname: 300,
      profileImg:
        "https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg",
    };
    return request(app)
      .patch("/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(toUpdateBad)
      .expect(400)
      .then(({body})=>{
        console.log(body)
      })
  });
});
