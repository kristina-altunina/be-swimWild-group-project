const { app } = require("../server");
const request = require("supertest");
const mongoose = require("mongoose");

const { testSeed } = require("../models/seed");
const locations = require("../test-data/locations");
const users = require("../test-data/users");
const { accessToken, test2atOutlookComToken } = require("./access-token");
const Users = require("../models/users-model");

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
  return mongoose.connection.close();
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
        console.log("this body", body);
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

describe("POST /users", () => {
  test("should respond with and create user", () => {
    const postBody = {
      name: "Test User",
      nickname: "test",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${test2atOutlookComToken}`)
      .expect(201)
      .then(({ body }) => {
        expect(body).toMatchObject({
          uid: "ChYMb6pn4sQn4Hs0qt6XW9TaE742",
          name: "Test User",
          nickname: "test",
          profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
          dob: "1997-08-29T18:00:00.000Z",
        });
      });
  });
  test("should respond with 400 if uid already exists", () => {
    const postBody = {
      name: "Test User Duplicate",
      nickname: "nickname",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400);
  });
  test("should respond with 400 if nickname already exists", () => {
    const postBody = {
      name: "Test User Duplicate",
      nickname: "tester",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${test2atOutlookComToken}`)
      .expect(400);
  });
  test("should respond with 400 if body missing name", () => {
    const postBody = {
      nickname: "newnickname",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${test2atOutlookComToken}`)
      .expect(400);
  });
  test("should respond with 400 if body missing nickname", () => {
    const postBody = {
      name: "my name",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
      dob: "1997-08-29T18:00:00+0000",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${test2atOutlookComToken}`)
      .expect(400);
  });
  test("should respond with 400 if body missing dob", () => {
    const postBody = {
      name: "my name",
      nickname: "https://i.redd.it/p6f66n7xbmb11.jpg",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.jpg",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${test2atOutlookComToken}`)
      .expect(400);
  });
  test("should respond with 400 if image url invalid", () => {
    const postBody = {
      name: "my name",
      nickname: "https://i.redd.it/p6f66n7xbmb11.jpg",
      profileImg: "https://i.redd.it/p6f66n7xbmb11.notanimage",
    };
    return request(app)
      .post("/users")
      .send(postBody)
      .set("Authorization", `Bearer ${test2atOutlookComToken}`)
      .expect(400);
  });
});
